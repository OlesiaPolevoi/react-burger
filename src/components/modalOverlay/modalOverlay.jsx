import React from "react";
import modalOverlay from "./modalOverlay.module.css";

export function ModalOverlay({ onClick }) {
  return <div onClick={onClick} className={modalOverlay.background}></div>;
}
