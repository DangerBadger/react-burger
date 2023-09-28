/* eslint-disable react/require-default-props */
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import stylesIngredientDetails from './IngredientDetails.module.css';

function IngredientDetails({ title }) {
  const { id } = useParams();
  const ingredients = useSelector((store) => store.ingredientsData.ingredients);
  const currentIngredient = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  return (
    <div className={stylesIngredientDetails.container}>
      {title && (
        <h2
          className={`${stylesIngredientDetails.title} text text_type_main-large`}
        >
          {title}
        </h2>
      )}
      <img
        src={currentIngredient && currentIngredient.image_large}
        alt={currentIngredient && currentIngredient.name}
      />
      <h3 className="text text_type_main-medium mt-4">
        {currentIngredient && currentIngredient.name}
      </h3>
      <ul
        className={`${stylesIngredientDetails.energyValueContainer} mt-8 mb-15`}
      >
        <li className={stylesIngredientDetails.energyValueItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient && currentIngredient.calories}
          </p>
        </li>
        <li className={stylesIngredientDetails.energyValueItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient && currentIngredient.proteins}
          </p>
        </li>
        <li className={stylesIngredientDetails.energyValueItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive ">
            {currentIngredient && currentIngredient.fat}
          </p>
        </li>
        <li className={stylesIngredientDetails.energyValueItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient && currentIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  title: PropTypes.string,
};
