"use client";
import { useEffect, useState } from "react";

export default function ScreenResizeEvent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Define the function to handle resize events
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      console.log("Screen width:", window.innerWidth);
    };

    // Add the resize event listener
    window.addEventListener("resize", handleResize);

    // Call the handler immediately to log the initial width
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (screenWidth === 0) return null;
  else return <>{children}</>;
}
