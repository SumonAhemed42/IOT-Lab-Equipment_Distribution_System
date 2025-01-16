import Profile from "./Profile";
import More from "./More";
import Product from "./Product";
import Application from "./Application";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="w-full h-[28px] pl-3 pr-5 mx-auto bg-gray-200 flex justify-between items-stretch">
      {/* Left */}
      <div className="flex items-stretch">
        <div className="py-1 px-2 fontSftBold flex justify-center items-center">
          BDU LIMS
        </div>
        <div className="py-1 px-2 hover:bg-white cursor-pointer flex justify-center items-center">
          Home
        </div>
        <div className="py-1 px-2 hover:bg-white cursor-pointer flex justify-center items-center">
          Back
        </div>
        <div className="py-1 px-2 hover:bg-white cursor-pointer flex justify-center items-center">
          Exit
        </div>
        <div className="py-1 px-2 hover:bg-white cursor-pointer flex justify-center items-center">
          Reload
        </div>
        <Product />
        <Application />
        <div className="py-1 px-2 hover:bg-white cursor-pointer flex justify-center items-center">
          People
        </div>
        <Profile />
        <More />
      </div>

      {/* Right */}
      <div className="flex items-stretch">
        <div className="flex items-center">
          <Image
            src="/image/bdu-logo.png"
            width="40"
            height="0"
            alt="Profile image"
          />
        </div>
      </div>
    </div>
  );
}
