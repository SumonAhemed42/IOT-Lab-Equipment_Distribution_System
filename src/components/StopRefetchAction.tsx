"use client";
import useGlobalContext from "@/app/c/GlobalContext";
import { Dispatch, SetStateAction, useMemo, useEffect } from "react";
import Console from "@/utils/console";
import $$ from "@/utils/global-variables";

let interval: any;

/*****
 * This component responsible for stop the rotation of refresh icon
 *****/
export default function StopRefetchAction() {
  const { doRefetch, setDoRefetch } = useGlobalContext();
  return useMemo(
    () => (
      <_StopRefetchAction doRefetch={doRefetch} setDoRefetch={setDoRefetch} />
    ),
    [doRefetch, setDoRefetch]
  );
}

function _StopRefetchAction({
  doRefetch,
  setDoRefetch,
}: {
  doRefetch: boolean;
  setDoRefetch: Dispatch<SetStateAction<boolean>>;
}) {
  Console.component("StopRefetchAction");

  useEffect(() => {
    if (doRefetch) {
      setTimeout(() => {
        if (interval === undefined) {
          interval = setInterval(() => {
            console.log("totalOnProgressAPI", $$.totalOnProgressAPI);
            if ($$.totalOnProgressAPI === 0) {
              clearInterval(interval);
              interval = undefined;
              setDoRefetch(false);
            }
          }, 500);
        }
      }, 500);
    }
  }, [doRefetch, setDoRefetch]);

  return null;
}
