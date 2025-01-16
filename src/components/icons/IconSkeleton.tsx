import { isNotNull } from "@/utils/more";

export default function IconSkeleton({
  children,
  title,
  rtlTitle,
  onClick,
  className,
  isActive,
  isIconActive,
  whiteBackground,
}: {
  children: React.ReactNode;
  title?: string;
  rtlTitle?: boolean;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  isIconActive?: boolean;
  whiteBackground?: boolean;
}) {
  return (
    <div
      className={`hoverIconSkeleton ${
        whiteBackground ? "whiteBackground" : ""
      } relative group/svgIconTitle z-1 InnerChieldNonClickable ${className}
        ${isActive ? "active" : ""}
        ${isIconActive ? "activeIconOnly" : ""}
        `}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}

      {/* Title showing block */}
      {isActive !== true && (
        <div
          className={`w-max py-1 px-2 rounded-md absolute top-[38px] ${
            rtlTitle ? "right-0" : "left-[50%] -translate-x-[50%]"
          } bg-gray-700 opacity-0 pointer-events-none ${
            isNotNull(title) && "group-hover/svgIconTitle:opacity-100"
          } transition-opacity delay-150`}
        >
          <div className="w-max text-center text-white text-xs">{title}</div>
        </div>
      )}
    </div>
  );
}
