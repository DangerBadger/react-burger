import PropTypes from 'prop-types';

import { ingredientPropTypes } from '../../utils/propShapes';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import mainStyle from './Main.module.css';

function Main({
  ingredientsData,
  setCurrentIngredient,
  orderOpen,
  ingredientOpen,
}) {
  return (
    <main className={mainStyle.main}>
      <section className={mainStyle.section}>
        <BurgerIngredients
          ingredientsData={ingredientsData}
          setCurrentIngredient={setCurrentIngredient}
          ingredientOpen={ingredientOpen}
        />
        <BurgerConstructor
          ingredientsData={ingredientsData}
          orderOpen={orderOpen}
        />
      </section>
    </main>
  );
}

export default Main;

Main.propTypes = {
  orderOpen: PropTypes.func.isRequired,
  ingredientOpen: PropTypes.func.isRequired,
  setCurrentIngredient: PropTypes.func.isRequired,
  ingredientsData: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};
