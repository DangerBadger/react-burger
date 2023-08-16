import PropTypes from 'prop-types';

import { ingredientPropTypes } from '../../utils/propShapes';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import mainStyle from './Main.module.css';

function Main({
  setCurrentIngredient,
  orderOpen,
  ingredientOpen,
  setAddedIngredients,
}) {
  return (
    <main className={mainStyle.main}>
      <section className={mainStyle.section}>
        <BurgerIngredients
          setCurrentIngredient={setCurrentIngredient}
          ingredientOpen={ingredientOpen}
          setAddedIngredients={setAddedIngredients}
        />
        <BurgerConstructor orderOpen={orderOpen} />
      </section>
    </main>
  );
}

export default Main;

Main.propTypes = {
  setAddedIngredients: PropTypes.func.isRequired,
  orderOpen: PropTypes.func.isRequired,
  ingredientOpen: PropTypes.func.isRequired,
  setCurrentIngredient: PropTypes.func.isRequired,
};
