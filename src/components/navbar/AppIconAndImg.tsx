"use client";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import useGlobalContext, { loggedUserType } from "@/app/c/GlobalContext";
import { useMemo } from "react";
import Console from "@/utils/console";
import IconSkeleton from "@/components/icons/IconSkeleton";
import GoogleIcons from "@/components/icons/GoogleIcons";
import $$ from "@/utils/global-variables";
import { encode } from "@/utils/text-encode-decode";
import { LocalStorage } from "@/utils/stroage";

/*****
 * SUB COMPONENT
 *****/
export default function AppIconAndImg() {
  return (
    <div className="flex gap-4 items-center z-2">
      <AppIcon />
      <CircleImg />
    </div>
  );
}

/*****
 * L2 SUB COMPONENT
 *****/
const AppIcon = () => {
  return (
    <Link href="/c/bdu-apps">
      <IconSkeleton title="BDU websites">
        <GoogleIcons.apps className="p-1 w-8 h-8 fill-gray-500" />
      </IconSkeleton>
    </Link>
  );
};

/*****
 * L2 SUB COMPONENT
 *****/
function CircleImg() {
  const { loggedUser } = useGlobalContext();
  return useMemo(() => <_CircleImg loggedUser={loggedUser} />, [loggedUser]);
}

function _CircleImg({ loggedUser }: { loggedUser: loggedUserType }) {
  Console.component("CircleImg");
  const [isApear, setIsApear] = useState<boolean>(false);
  let isHovered: boolean = false;

  if (loggedUser)
    return (
      <div className="relative">
        {/* Click section */}
        <label className="p-2 flex gap-3 items-center bg-white dark:bgBlack2 border border-gray-300 rounded-lg cursor-pointer">
          <input
            type="text"
            className="w-0 h-0 absolute"
            onClick={() => setIsApear(true)}
            onBlur={() => {
              !isHovered && setIsApear(false);
            }}
          />
          <Image
            src="/image/bdu-logo.png"
            width={70}
            height={36}
            alt="BDU logo"
            priority={true}
          />
          <Image
            src={loggedUser.image || $$.defaultUserImg}
            width={36}
            height={36}
            alt="Profile image"
            className="rounded-full"
          />
        </label>

        {/* Apear-Disapear section */}
        {isApear && (
          <div
            onMouseEnter={() => (isHovered = true)}
            onMouseLeave={() => (isHovered = false)}
            className="w-[350px] px-4 py-6 absolute top-[57px] right-0 flex flex-col gap-4 !items-center rounded-xl bg-gray-100 dark:bgBlack boxShadow overflow-hidden"
          >
            <div className="w-full text-center truncate">
              {loggedUser.email}
            </div>
            <Image
              src={loggedUser.image || $$.defaultUserImg}
              className="rounded-full"
              width={75}
              height={75}
              alt="Profile image"
            />
            <div className="w-full text-center truncate text-2xl fontGs">
              Hi, {loggedUser.name}
            </div>
            <a
              href="https://myaccount.google.com/"
              target="_blank"
              className="w-fit px-3 py-2 rounded-[20px] border border-gray-300 hover:bg-white dark:hover:bgBlack2 hover:cursor-pointer"
            >
              Manage google account
            </a>
            <div className="flex">
              <div
                onClick={() => signIn("google")}
                className="w-[162px] p-3 flex gap-2 rounded-tl-3xl rounded-bl-3xl cursor-pointer bg-white dark:bgBlack2 hover:bg-gray-200 border-r border-gray-100"
              >
                <GoogleIcons.swap className="w-5 h-5 fill-black" />
                <div>Change account</div>
              </div>
              <Link
                href={`${$$.loginSiteDomain}/c/logout`}
                onClick={() => LocalStorage.clear()}
              >
                <div className="w-[158px] p-3 flex gap-2 rounded-tr-3xl rounded-br-3xl cursor-pointer bg-white dark:bgBlack2 hover:bg-gray-200">
                  <GoogleIcons.logout className="w-5 h-5 fill-black" />
                  Logout
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
}
