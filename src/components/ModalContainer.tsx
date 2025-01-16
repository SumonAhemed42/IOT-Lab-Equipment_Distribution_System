"use client";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

export default function ModalContainer({ children }: { children: ReactNode }) {
  useEffect(() => {
    setTimeout(() => {
      const el = document.getElementById("idModalContainer");
      const el2: HTMLElement | null = document.querySelector(
        "#idModalContainer>div"
      );
      if (el) {
        el.style.opacity = "1";
        el.style.pointerEvents = "all";
      }
      if (el2) el2.style.top = "0";
    }, 0);
  }, []);

  return createPortal(
    <div
      id="idModalContainer"
      className="w-full h-full fixed top-0 left-0 flex justify-center items-center"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 50,
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div
        className="bg-white dark:bgBlack boxShadow rounded-md relative transform -translate-y-[50px]"
        style={{
          top: "50px",
          transition: "top 0.3s ease-in-out",
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export function closingTransition(func: () => void) {
  const el = document.getElementById("idModalContainer");
  const el2: HTMLElement | null = document.querySelector(
    "#idModalContainer>div"
  );
  if (el) {
    el.style.opacity = "0";
    el.style.pointerEvents = "none";
  }
  if (el2) el2.style.top = "50px";

  setTimeout(() => {
    func();
  }, 500);
}
