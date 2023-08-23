/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { foundBunPropTypes } from '../../utils/propShapes';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import mainStyle from './Main.module.css';

function Main({ openIngredientDetails, sendOrderHandler }) {
  return (
    <main className={mainStyle.main}>
      <section className={mainStyle.section}>
        <BurgerIngredients openIngredientDetails={openIngredientDetails} />
        <BurgerConstructor sendOrderHandler={sendOrderHandler} />
      </section>
    </main>
  );
}

export default Main;

Main.propTypes = {
  sendOrderHandler: PropTypes.func.isRequired,
  openIngredientDetails: PropTypes.func,
};
