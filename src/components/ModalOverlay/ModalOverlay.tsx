/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FC } from 'react';

import stylesModalOverlay from './ModalOverlay.module.css';

interface IModalOverlay {
  onClose: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClose }) => {
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
};

export default ModalOverlay;
