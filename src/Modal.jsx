import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal({ children }) {
  const modalRef = useRef(null);

  if (!modalRef.current) {
    modalRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRootElem = document.getElementById("modal");
    modalRootElem.appendChild(modalRef.current);

    return () => modalRootElem.removeChild(modalRef.current);
  }, []);

  return createPortal(<>{children}</>, modalRef.current);
}
