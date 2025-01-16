import { toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

export function Toast(message: string) {
  toast(message, {
    transition: Flip,
    position: "bottom-left",
    autoClose: 7000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
}
export function Toast2(message: string) {
  toast(message, {
    transition: Flip,
    position: "bottom-left",
    autoClose: 7000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: {
      background: "#1F1F1F",
      color: "white",
      fontFamily: "Google sans",
    },
  });
}

export function ToastDismiss() {
  toast.dismiss();
}
