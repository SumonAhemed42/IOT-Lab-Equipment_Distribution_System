"use client";
import LineLoader from "@/components/preloader/LineLoader";
import { useEffect, useRef } from "react";

export default function NavbarSkeletonWithTab({
  children,
  zIndex,
  noBorder,
  className,
  hideLineLoader,
}: {
  children: React.ReactNode;
  zIndex: number;
  noBorder?: boolean;
  className?: string;
  hideLineLoader?: boolean;
}) {
  const idOfNavbar = useRef<HTMLDivElement>(null);

  // When scroll down then shadow will be added into navbar skeleton
  useEffect(() => {
    const handleScroll = () => {
      const scrollYValue = window.scrollY;
      const element = idOfNavbar.current;
      if (element) {
        if (scrollYValue > 30) element.classList.add("navbarShadow");
        else element.classList.remove("navbarShadow");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div element-name="Navbar skeleton">
      <div
        ref={idOfNavbar}
        className={`w-full h-[114px] bg-white fixed top-0 left-0 ${
          noBorder !== true && "border-b border-gray-300"
        } ${className && className}`}
        style={{
          zIndex: zIndex,
        }}
      >
        {hideLineLoader !== true && (
          <div className="w-full absolute left-0 bottom-[49px]">
            <LineLoader />
          </div>
        )}
        {children}
      </div>
      <div className="w-full h-[114px]"></div>
    </div>
  );
}
