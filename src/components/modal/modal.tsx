import { ReactNode, useEffect } from 'react';
import ReactDom from 'react-dom';
import modal from './modal.module.css';
import { ModalOverlay } from '../modalOverlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TModalProps = {
  children: ReactNode;
  onClose: () => void;
  title: string;
};
export function Modal({ children, onClose, title }: TModalProps) {
  useEffect(() => {
    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.isComposing || event.key === 'Escape') {
        onClose();
        return;
      }
    };

    document.addEventListener('keydown', handleEscKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEscKeyPress!);
    };
  }, [onClose]);

  return ReactDom.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={modal.container}>
        <header className={modal.header}>
          <h2 className={modal.title}>{title}</h2>
          <div className={modal.closeIcon}>
            <CloseIcon type='primary' onClick={onClose} />
          </div>
        </header>
        <div>{children}</div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
}
