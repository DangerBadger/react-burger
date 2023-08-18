/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesModal from './Modal.module.css';

import ModalOverlay from '../ModalOverlay/ModalOverlay';

function Modal({ onClose, children, title = '' }) {
  const modalRoot = document.getElementById('react-modals');

  // Закрытие модалки по esc
  const closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  };

  // Навешивание слушателя для закрытия модалки по esc
  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, []);

  return createPortal(
    <>
      <div className={stylesModal.container}>
        <div className={`${stylesModal.titleContainer} ml-10 mr-10 mt-10`}>
          <h2 className={`${stylesModal.title} text text_type_main-large`}>
            {title}
          </h2>
          <button
            type="button"
            className={`${stylesModal.closeButton} ml-9`}
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};