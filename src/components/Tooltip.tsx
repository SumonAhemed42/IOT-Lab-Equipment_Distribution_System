export default function Tooltip({
  children,
  title,
  onClick,
  className,
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`w-fit h-fit relative group/svgIconTitle z-1 InnerChieldNonClickable ${className}`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}

      {/* Title showing block */}
      {
        <div
          className={`w-max py-1 px-2 rounded-md absolute top-[28px] left-[50%] -translate-x-[50%] bg-gray-700 opacity-0 pointer-events-none ${
            title !== "" && "group-hover/svgIconTitle:opacity-100"
          } transition-opacity delay-150`}
        >
          <div className="w-max text-center text-white text-xs">{title}</div>
        </div>
      }
    </div>
  );
}
