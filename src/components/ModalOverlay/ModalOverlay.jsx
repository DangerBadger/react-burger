/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';

import stylesModalOverlay from './ModalOverlay.module.css';

function ModalOverlay({ closeModal }) {
  return (
    <div
      className={stylesModalOverlay.overlay}
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) {
          closeModal();
        }
      }}
    />
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
