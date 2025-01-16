"use client";

import Console from "@/utils/console";

let isLight = true;
let isBlue = true;

export default function ThemeColorSwitch() {
  Console.component("ThemeColorSwitch");

  function changeTheme() {
    isLight = !isLight;
    const el = document.querySelector("html");
    if (isLight) {
      if (el) el.classList.remove("dark");
    } else {
      if (el) el.classList.add("dark");
    }
  }
  function changeColor() {
    isBlue = !isBlue;
    const el: any = document.querySelector("body");
    if (isBlue) {
      if (el)
        el.style =
          "--blue:#007bff; --blue2:#0069da; --lightBlue:#e8f0fe; --lightBlue2:#9fc3fe;";
    } else {
      if (el)
        el.style =
          "--blue:#D91A60; --blue2:#ba0044; --lightBlue:#fce7ef; --lightBlue2:#ffd6e6;";
    }
  }

  return (
    <div
      element-name="Theme switcher"
      className="fixed left-5 bottom-5 flex gap-2"
    >
      <div
        className="text-xs hover:underline text-gray-500 cursor-pointer"
        onClick={changeTheme}
      >
        Theme
      </div>
      <div
        className="text-xs hover:underline text-gray-500 cursor-pointer"
        onClick={changeColor}
      >
        Color
      </div>
    </div>
  );
}
