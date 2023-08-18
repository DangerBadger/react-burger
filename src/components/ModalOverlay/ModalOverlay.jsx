/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';

import stylesModalOverlay from './ModalOverlay.module.css';

function ModalOverlay({ onClose }) {
  return (
    <div
      className={stylesModalOverlay.overlay}
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) {
          onClose();
        }
      }}
    />
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
