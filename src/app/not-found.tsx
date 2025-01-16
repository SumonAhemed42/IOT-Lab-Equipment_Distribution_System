"use client";
import SpinLoader from "@/components/preloader/SpinLoader";
import $$ from "@/utils/global-variables";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    router.replace($$.domain + "/c/home");
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center transform -translate-y-[50px]">
      <SpinLoader />
    </div>
  );
}
