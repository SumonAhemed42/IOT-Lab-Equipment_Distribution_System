"use client";
import { useEffect, useRef } from "react";

export default function FullScreenEvent({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  function enterFullScreen() {
    if (!document.fullscreenElement) {
      const el = containerRef.current;
      if (el)
        el.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message}`
          );
        });
    }
  }

  function exitFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(
          `Error attempting to exit full-screen mode: ${err.message}`
        );
      });
    }
  }

  /*
  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.fullscreenElement) {
        console.log("Running...");
        enterFullScreen();
      } else clearInterval(interval);
    }, 50);

    return () => {
      exitFullScreen();
    };
  }, []);
  */

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col">
      {children}
      {/* Some browser need user interaction to enter full screen */}
      {/* <div
        className="w-screen h-screen bg-red-600 opacity-50 fixed top-0 left-0"
        onClick={(e) => {
          const el = e.target as any;
          if (el) el.remove();
        }}
      ></div> */}
    </div>
  );
}
