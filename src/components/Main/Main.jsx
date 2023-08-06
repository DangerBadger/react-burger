import PropTypes from 'prop-types';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import mainStyle from './Main.module.css';

function Main({ ingredientsData, orderOpen }) {
  return (
    <main className={mainStyle.main}>
      <section className={mainStyle.section}>
        <BurgerIngredients ingredientsData={ingredientsData} />
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
  ingredientsData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ).isRequired,
};
