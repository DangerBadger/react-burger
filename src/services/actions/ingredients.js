import { v4 as uuidv4 } from 'uuid';
import api from '../../utils/Api';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const UNSELECT_INGREDIENT = 'UNSELECT_INGREDIENT';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';

export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    api
      .getIngredients()
      .then((res) => {
        setTimeout(
          () =>
            dispatch({
              type: GET_INGREDIENTS_SUCCESS,
              payload: res.data,
            }),
          '1000'
        );
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}

export const selectIngredient = (ingredient) => ({
  type: SELECT_INGREDIENT,
  payload: ingredient,
});

export const unselectIngredient = () => ({
  type: UNSELECT_INGREDIENT,
});

export const addIngredient = (ingredientsArr) => {
  const enhancedArr = ingredientsArr.map((ingredient) => {
    const ingredientDuplicate = { ...ingredient };
    ingredientDuplicate.uniqueId = uuidv4();
    return ingredientDuplicate;
  });

  return {
    type: ADD_INGREDIENT,
    payload: enhancedArr,
  };
};

export const deleteIngredient = (ingredientsArr) => ({
  type: DELETE_INGREDIENT,
  payload: ingredientsArr,
});

export const clearIngredients = () => ({
  type: CLEAR_INGREDIENTS,
});

export const sortIngredients = (fillingsArr) => ({
  type: SORT_INGREDIENTS,
  payload: fillingsArr,
});
