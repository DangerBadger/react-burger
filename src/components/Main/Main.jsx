import PropTypes from 'prop-types';
import { foundBunPropTypes } from '../../utils/propShapes';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import mainStyle from './Main.module.css';

function Main({
  setCurrentIngredient,
  ingredientOpen,
  setAddedIngredients,
  sendOrderHandler,
  foundBun,
  setFoundBun,
}) {
  return (
    <main className={mainStyle.main}>
      <section className={mainStyle.section}>
        <BurgerIngredients
          setCurrentIngredient={setCurrentIngredient}
          ingredientOpen={ingredientOpen}
          setAddedIngredients={setAddedIngredients}
        />
        <BurgerConstructor
          setAddedIngredients={setAddedIngredients}
          sendOrderHandler={sendOrderHandler}
          foundBun={foundBun}
          setFoundBun={setFoundBun}
        />
      </section>
    </main>
  );
}

export default Main;

Main.propTypes = {
  foundBun: foundBunPropTypes.isRequired,
  setFoundBun: PropTypes.func.isRequired,
  sendOrderHandler: PropTypes.func.isRequired,
  setAddedIngredients: PropTypes.func.isRequired,
  ingredientOpen: PropTypes.func.isRequired,
  setCurrentIngredient: PropTypes.func.isRequired,
};
