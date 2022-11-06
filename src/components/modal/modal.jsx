import React, { useEffect } from "react";
import ReactDom from "react-dom";
import modal from "./modal.module.css";
import { ModalOverlay } from "../modalOverlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export function Modal({ children, modalIsOpen, onClose, title }) {
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
      <ModalOverlay onClick={onClose} />
      <div className={modal.container}>
        <header className={modal.header}>
          <h2 className={modal.title}>{title}</h2>
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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  modalIsOpen: PropTypes.bool.isRequired,
  children: PropTypes.object,
};
