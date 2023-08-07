import PropTypes from 'prop-types';

import stylesIngredientDetails from './IngredientDetails.module.css';

function IngredientDetails({ currentIngredient }) {
  return (
    <div className={stylesIngredientDetails.container}>
      <img src={currentIngredient.image_large} alt={currentIngredient.name} />
      <h3 className="text text_type_main-medium mt-4">
        {currentIngredient.name}
      </h3>
      <ul
        className={`${stylesIngredientDetails.energyValueContainer} mt-8 mb-15`}
      >
        <li className={stylesIngredientDetails.energyValueItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.calories}
          </p>
        </li>
        <li className={stylesIngredientDetails.energyValueItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.proteins}
          </p>
        </li>
        <li className={stylesIngredientDetails.energyValueItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive ">
            {currentIngredient.fat}
          </p>
        </li>
        <li className={stylesIngredientDetails.energyValueItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  currentIngredient: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
