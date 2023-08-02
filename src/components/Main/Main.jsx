import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import mainStyle from './Main.module.css';

function Main() {
  return (
    <main className={mainStyle.main}>
      <section className={mainStyle.section}>
        <BurgerIngredients />
        <BurgerConstructor />
      </section>
    </main>
  );
}

export default Main;
