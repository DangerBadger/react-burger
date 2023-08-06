import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from '../../utils/Api';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

function App() {
  const [ingredientsData, setIngredientsData] = useState([]);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIngredientDetailsOpened] =
    useState(false);

  // Есть ли открытый попап для навешивания слушателя?
  const isPopupOpened = isOrderDetailsOpened || isIngredientDetailsOpened;

  // Закрытие всех модалок
  const closeAllPopups = () => {
    setIsOrderDetailsOpened(false);
    setIngredientDetailsOpened(false);
  };

  // Закрытие модалки по esc
  const closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  };

  // Навешивание слушателя для закрытия модалки по esc
  useEffect(() => {
    if (isPopupOpened) {
      document.addEventListener('keydown', closeByEsc);
    }

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, [isPopupOpened]);

  useEffect(() => {
    api
      .getIngredients()
      .then((ingredients) => {
        setIngredientsData(ingredients.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  const orderOpen = () => {
    setIsOrderDetailsOpened(true);
  };

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Main ingredientsData={ingredientsData} orderOpen={orderOpen} />
      </div>
      {isOrderDetailsOpened && (
        <Modal onClose={closeAllPopups}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
