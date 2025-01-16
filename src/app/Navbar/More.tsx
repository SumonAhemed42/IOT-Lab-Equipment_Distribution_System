"use client";
import GithubIcons from "@/components/icons/GithubIcons";
import { useState } from "react";

export default function More() {
  const [isApear, setIsApear] = useState<boolean>(false);

  return (
    <div
      className={`relative hover:bg-white ${
        isApear ? "bg-white" : ""
      } flex items-center`}
    >
      {/* Click section */}
      <label>
        <input
          type="text"
          className="w-0 h-0 absolute"
          onClick={() => {
            setIsApear(true);
            setTimeout(() => setIsApear(true), 260);
          }}
          onBlur={() => {
            setTimeout(() => setIsApear(false), 250);
          }}
        />
        <div className="py-1 px-2 cursor-pointer flex justify-center items-center">
          More
        </div>
      </label>

      {isApear && (
        <div className="w-max p-1.5 absolute top-[28px] bgBlack2 text-white z-1 rounded-lg">
          <div className="pl-1 pr-4 p-[3px] cursor-pointer hover:bgBlue rounded-[4px] flex items-center gap-1">
            <GithubIcons.tik />
            <div>Always hide welcome banner</div>
          </div>
          <div className="pl-1 pr-4 p-[3px] cursor-pointer hover:bgBlue rounded-[4px] flex items-center gap-1">
            <GithubIcons.tik />
            <div>Light theme</div>
          </div>
          <div className="pl-1 pr-4 p-[3px] cursor-pointer hover:bgBlue rounded-[4px] flex items-center gap-1">
            <GithubIcons.tik className="opacity-0" />
            <div>Dark theme</div>
          </div>
          <div className="pl-1 pr-4 p-[3px] cursor-pointer hover:bgBlue rounded-[4px] flex items-center gap-1">
            <GithubIcons.tik className="opacity-0" />
            <div>User access</div>
          </div>
          <div className="pl-1 pr-4 p-[3px] cursor-pointer hover:bgBlue rounded-[4px] flex items-center gap-1">
            <GithubIcons.tik className="opacity-0" />
            <div>About application</div>
          </div>
        </div>
      )}
    </div>
  );
}
