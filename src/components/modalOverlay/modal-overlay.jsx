import modalOverlay from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export function ModalOverlay({ onClick }) {
  return <div onClick={onClick} className={modalOverlay.background}></div>;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
