import modalOverlay from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClick: () => void;
};
export function ModalOverlay({ onClick }: TModalOverlayProps) {
  return <div onClick={onClick} className={modalOverlay.background}></div>;
}
