import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa6";
import { FaUnderline } from "react-icons/fa6";
import { FaHeading } from "react-icons/fa6";
import { FaListOl } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoMdReturnLeft } from "react-icons/io";
import { FaRemoveFormat } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { format } from "./functions";
import IconSkeleton from "../icons/IconSkeleton";

export default function Toolbar({
  className,
  addImage,
}: {
  className: string;
  addImage: () => void;
}) {
  return (
    <div className={`toolbar ${className}`}>
      <button onClick={() => format("bold")}>
        <IconSkeleton title="Bold">
          <FaBold />
        </IconSkeleton>
      </button>
      <button onClick={() => format("italic")}>
        <IconSkeleton title="Italic">
          <FaItalic />
        </IconSkeleton>
      </button>
      <button onClick={() => format("underline")}>
        <IconSkeleton title="Underline">
          <FaUnderline />
        </IconSkeleton>
      </button>
      <button onClick={() => format("heading")}>
        <IconSkeleton title="Heading">
          <FaHeading />
        </IconSkeleton>
      </button>
      <button onClick={() => format("ordered")}>
        <IconSkeleton title="Ordered list">
          <FaListOl />
        </IconSkeleton>
      </button>
      <button onClick={() => format("bullet")}>
        <IconSkeleton title="Unordered list">
          <FaListUl />
        </IconSkeleton>
      </button>
      {/* <button onClick={() => format("image")}> */}
      <button onClick={addImage}>
        <IconSkeleton title="Add image">
          <FaImage />
        </IconSkeleton>
      </button>
      <button onClick={() => format("link")}>
        <IconSkeleton title="Hyperlink">
          <FaLink />
        </IconSkeleton>
      </button>
      <button onClick={() => format("clean")}>
        <IconSkeleton title="Clear format">
          <FaRemoveFormat />
        </IconSkeleton>
      </button>
    </div>
  );
}
