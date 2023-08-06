/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesModal from './Modal.module.css';

import ModalOverlay from '../ModalOverlay/ModalOverlay';

function Modal({ onClose, children, title = '' }) {
  const modalRoot = document.getElementById('react-modals');

  return createPortal(
    <>
      <div className={stylesModal.container}>
        <div className={stylesModal.titleContainer}>
          {title && <h2>{title}</h2>}
          <button type="button">
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
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};
