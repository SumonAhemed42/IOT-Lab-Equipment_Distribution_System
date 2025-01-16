import SpinLoader from "@/components/preloader/SpinLoader";

export default function LoadingTextLoader() {
  return (
    <div className="loadingTextLoaderId flex items-center gap-1 fixed top-4 left-4">
      <SpinLoader size={28} />
      <div className="text-gray-600">Loading...</div>
    </div>
  );
}

export function showLoader() {
  const elements = document.querySelectorAll(".loadingTextLoaderId");
  elements.forEach((el: any) => {
    if (el) el.style.display = "flex";
  });
}

export async function hideLoader() {
  const elements = document.querySelectorAll(".loadingTextLoaderId");
  elements.forEach((el: any) => {
    if (el) el.style.display = "none";
  });
}
