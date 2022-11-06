import React, { useEffect } from "react";
import ReactDom from "react-dom";
import modal from "./modal.module.css";
import { ModalOverlay } from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function Modal({ children, modalIsOpen, onClose }) {
  const handleEscKeyPress = (event) => {
    if (event.isComposing || event.keyCode === 27) {
      onClose();
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, []);

  if (!modalIsOpen) return null;
  return ReactDom.createPortal(
    <>
      {/* need to change state of Modal - which is defined in App components - when clicking on Modal */}
      <ModalOverlay onClick={onClose} />
      <div className={modal.container}>
        <header className={modal.header}>
          <h2></h2>
          <div className={modal.closeIcon}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </header>
        <div>{children}</div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
