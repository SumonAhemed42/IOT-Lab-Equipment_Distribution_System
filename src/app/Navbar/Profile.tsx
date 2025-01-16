"use client";
import { useState } from "react";

export default function Profile() {
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
          Profile
        </div>
      </label>

      {isApear && (
        <div className="w-max p-1.5 absolute top-[28px] bgBlack2 text-white z-1 rounded-lg">
          <div className="px-4 p-[3px] cursor-pointer hover:bgBlue rounded-[4px]">
            View details
          </div>
          <div className="px-4 p-[3px] cursor-pointer hover:bgBlue rounded-[4px]">
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
