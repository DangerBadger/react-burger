import { useState, useEffect } from 'react';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';

function App() {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const isPopupOpened = isBurgerOpened;

  const closeAllPopups = () => {
    setIsBurgerOpened(false);
  };

  // Закрытие модалки по esc
  useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };
    if (isPopupOpened) {
      document.addEventListener('keydown', closeByEsc);
    }

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, [isPopupOpened]);

  const openBurger = () => {
    setIsBurgerOpened(true);
  };

  return (
    <div className={styles.app}>
      <AppHeader
        isOpened={isBurgerOpened}
        openBurger={openBurger}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
