import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from '../../utils/Api';
import IngredientsContext from '../../services/ingredientsContext';
import BurgerConstructorContext from '../../services/burgerConstructor';
import AddedIngredientsContext from '../../services/addedIngredients';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function App() {
  const [ingredientsData, setIngredientsData] = useState([]);
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [constructorData, setContructorData] = useState([]);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIngredientDetailsOpened] =
    useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});

  useEffect(() => {
    api
      .getIngredients()
      .then((ingredients) => {
        setIngredientsData(ingredients.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  // Открытие модалки заказа
  const orderOpen = () => {
    setIsOrderDetailsOpened(true);
  };

  // Открытие модалки ингредиента
  const ingredientOpen = () => {
    setIngredientDetailsOpened(true);
  };

  return (
    <IngredientsContext.Provider value={ingredientsData}>
      <BurgerConstructorContext.Provider value={constructorData}>
        <AddedIngredientsContext.Provider value={addedIngredients}>
          <div className={styles.app}>
            <AppHeader />
            <Main
              setCurrentIngredient={setCurrentIngredient}
              orderOpen={orderOpen}
              ingredientOpen={ingredientOpen}
              setAddedIngredients={setAddedIngredients}
            />
          </div>
          {isOrderDetailsOpened && (
            <Modal setOpen={setIsOrderDetailsOpened}>
              <OrderDetails />
            </Modal>
          )}
          {isIngredientDetailsOpened && (
            <Modal
              title="Детали ингредиента"
              setOpen={setIngredientDetailsOpened}
            >
              <IngredientDetails currentIngredient={currentIngredient} />
            </Modal>
          )}
        </AddedIngredientsContext.Provider>
      </BurgerConstructorContext.Provider>
    </IngredientsContext.Provider>
  );
}

export default App;
