import type { Metadata } from "next";
import "react-quill/dist/quill.snow.css";
import "@/scss/main.scss";
import Navbar from "./Navbar/Navbar";
import ScreenResizeEvent from "./ScreenResizeEvent";
import FullScreenEvent from "./FullScreenEvent";

export const metadata: Metadata = {
  title: "BDU LIMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-screen text-sm textBlack fontSft bgBlack3">
        <FullScreenEvent>
          <div
            className="w-full flex-1 rounded-lg overflow-hidden flex flex-col"
            style={{
              backgroundImage: `url("/image/wallpaper.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 50%",
              backgroundSize: "cover",
            }}
          >
            <Navbar />
            {/* <Banner /> */}
            <ScreenResizeEvent>
              <div className="flex-1 flex justify-center overflow-y-auto customThinScrollBar">
                {children}
              </div>
            </ScreenResizeEvent>
          </div>
        </FullScreenEvent>
        {/*  */}
        {/* <FloatingContent /> */}
      </body>
    </html>
  );
}
