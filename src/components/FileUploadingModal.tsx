"use client";
import Image from "next/image";
import ModalContainer, { closingTransition } from "./ModalContainer";
import { formatFileSize } from "@/utils/file-conversion/client-server";
import { FaFile } from "react-icons/fa";
import { isNull } from "@/utils/more";
import IconSkeleton from "./icons/IconSkeleton";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import $fileTypes from "@/json/file-types";
import axios from "axios";
import api from "@/app/api/endpoints";
import GoogleIcons from "./icons/GoogleIcons";
import useGlobalContext, {
  fileUploadingModalType,
} from "@/app/c/GlobalContext";
import $$ from "@/utils/global-variables";
import Console from "@/utils/console";

const cancelTokenSource: { [key: string]: any } = {};

export default function FileUploadingModal() {
  const { setFileUploadingModal } = useGlobalContext();
  return useMemo(
    () => <_FileUploadingModal setFileUploadingModal={setFileUploadingModal} />,
    [setFileUploadingModal]
  );
}

function _FileUploadingModal({
  setFileUploadingModal,
}: {
  setFileUploadingModal: Dispatch<SetStateAction<fileUploadingModalType>>;
}) {
  Console.component("FileUploadingModal");

  const closeModal = useCallback(() => {
    closingTransition(() => {
      setFileUploadingModal((prev) => ({
        ...prev,
        isOpen: false,
      }));
    });
  }, [setFileUploadingModal]);

  const [files, setFiles] = useState<FileList | null>(null);
  const [fileDropStart, setFileDropStart] = useState<boolean>(false);
  const [attachedFiles, setAttachedFiles] = useState<{ [key: string]: any }>(
    {}
  );
  const refInputFile = useRef<HTMLInputElement>(null);
  const refDropArea = useRef<HTMLDivElement>(null);

  const handleDragEnter = () => {
    setFileDropStart(true);
  };
  const handleDragLeave = () => {
    setFileDropStart(false);
  };
  const handleDragOver = (event: any) => {
    event.preventDefault();
    setFileDropStart(true);
  };
  const handleDrop = (event: any) => {
    event.preventDefault();
    setFileDropStart(false);
    setFiles(event.dataTransfer.files);
  };

  // When files are dropped or selected then uploading.
  useEffect(() => {
    if (files) {
      const totalFileCount = files.length;

      for (let i = 0; i < totalFileCount; i++) {
        const { name: fileName, size: fileSize } = files[i];

        let flag = false;
        if (attachedFiles[fileName]) flag = true;

        if (!flag) {
          (async () => {
            const fextension: string = fileName.substring(
              fileName.lastIndexOf(".") + 1
            );
            const fileType = $fileTypes(fextension) || null;

            let acceptSize = false;
            if (fileSize <= 1024 * 1024 * 1024) acceptSize = true;

            if (!fileType) return;
            else if (!acceptSize) return;
            else {
              setAttachedFiles((prev) => ({
                ...prev,
                [fileName]: {
                  fileSize: fileSize,
                  fileType: fileType,
                  uploadingProgress: 0,
                },
              }));

              try {
                cancelTokenSource[fileName] = axios.CancelToken.source();
                const formData = new FormData();
                formData.append("file", files[i]);
                formData.append("tag", $$.fileUploadTag);

                await axios.post(api.fileUpload.uploadFiles, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    "auth-token": $$.authToken || "",
                  },
                  onUploadProgress: (e: any) => {
                    // Store uploading progess value
                    setAttachedFiles((prev) => ({
                      ...prev,
                      [fileName]: {
                        ...prev[fileName],
                        uploadingProgress: e.progress * 100,
                      },
                    }));
                  },
                  cancelToken: cancelTokenSource[fileName].token,
                });

                // Sometimes onUploadProgress() freeze and reached at this section before its event.progress==1. So I make the progress 100% here.
                setAttachedFiles((prev) => ({
                  ...prev,
                  [fileName]: {
                    ...prev[fileName],
                    uploadingProgress: 100,
                  },
                }));
              } catch (error) {
                setAttachedFiles({});

                if (axios.isCancel(error))
                  console.log("File uploading cancelled");
                else {
                  console.error("Error uploading file:", error);
                }
              }
            }
          })();
        }
      }
    }
  }, [files]); // skip-->attachedFiles: As I store uploading progress numeric value so it triggers re-render and add image loader repeatly into editor

  // Determine when modal closed
  // When all files uploading progress is 100% then modal close autometically
  useEffect(() => {
    if (!isNull(attachedFiles)) {
      let isCompleted = true;
      for (const fileName in attachedFiles) {
        if (attachedFiles[fileName].uploadingProgress < 100)
          isCompleted = false;
      }
      if (isCompleted) {
        (async () => {
          await $$.fetchAllTmpFiles();
          setAttachedFiles({});
          closeModal();
        })();
      }
    }
  }, [attachedFiles]);

  // Cancel one uploading file
  function doCancelOneUploadingFile(fileName: any) {
    if (cancelTokenSource[fileName]) {
      cancelTokenSource[fileName].cancel("File upload cancelled by user");
      delete cancelTokenSource[fileName];
      //  Toast(`${fileName} uploading cancelled`);
      let newData: any = { ...attachedFiles };
      delete newData[fileName];
      setAttachedFiles(newData);
    }
  }

  // Cancel all uploading file
  function doCancelAllUploadingFile() {
    if (!isNull(attachedFiles)) {
      for (const fileName in attachedFiles) {
        doCancelOneUploadingFile(fileName);
      }
    }
    setAttachedFiles({});
  }

  return (
    <ModalContainer>
      <div
        className={`w-[800px] px-6 py-8 ${fileDropStart && "bgLightBlue"}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        ref={refDropArea}
      >
        <div className="flex justify-center items-center gap-5">
          <IconSkeleton
            title="Go back"
            onClick={() => {
              setAttachedFiles({});
              closeModal();
            }}
          >
            <GoogleIcons.arrow.back />
          </IconSkeleton>
          <div className="text-2xl fontGs">File attachment</div>
        </div>
        {/* ---------- */}
        {!isNull(attachedFiles) ? (
          <div className="w-full mt-8 flex justify-center items-center">
            <div className="w-[80%] px-5 pt-8 mb-4 boxShadow relative">
              <div className="w-full h-[250px] overflow-x-hidden overflow-y-auto">
                {/* a block */}
                {Object.entries(attachedFiles).map(
                  ([fileName, record]: [fileName: string, record: any]) => {
                    const { fileSize, uploadingProgress } = record;
                    return (
                      <div
                        key={fileName}
                        className="p-2 flex justify-between items-center gap-2"
                      >
                        <FaFile className="w-5 h-5 fill-gray-500" />
                        <div className="w-[130px] truncate">{fileName}</div>
                        <div className="w-[70px] text13 text-right text-gray-500">
                          {formatFileSize(fileSize)}
                        </div>
                        <div className="flex-1 h-2 bg-gray-200">
                          <div
                            className="h-2 bgBlue"
                            style={{ width: `${uploadingProgress}%` }}
                          ></div>
                        </div>
                        <IconSkeleton
                          title=""
                          onClick={() => doCancelOneUploadingFile(fileName)}
                          className={
                            uploadingProgress < 100
                              ? ""
                              : "opacity-0 pointer-events-none"
                          }
                        >
                          <GoogleIcons.close className="fill-gray-500" />
                        </IconSkeleton>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="w-full h-16 bg-white flex justify-end items-center">
                <button className="btn2" onClick={doCancelAllUploadingFile}>
                  Cancel all
                </button>
              </div>
            </div>
          </div>
        ) : (
          // ----------
          <div className="flex flex-col items-center gap-6">
            <Image
              src="/image/google/cloud.png"
              className="h-auto rounded-full"
              width="400"
              height="40"
              alt="Cloud image"
            />
            <input
              type="file"
              multiple
              onChange={(event) => setFiles(event.target.files)}
              hidden
              ref={refInputFile}
            />
            <button
              className="btn"
              onClick={() => refInputFile.current?.click()}
            >
              Browse
            </button>
            <div className="text-2xl fontGs">or drop a image file here</div>
          </div>
        )}
        {/* ---------- */}
      </div>
    </ModalContainer>
  );
}
