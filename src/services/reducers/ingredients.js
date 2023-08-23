/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  SELECT_INGREDIENT,
  UNSELECT_INGREDIENT,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  CLEAR_INGREDIENTS,
  SORT_INGREDIENTS,
} from '../actions/ingredients';

const inititalState = {
  ingredients: [],
  selectedIngredient: null,
  addedIngredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: true,
      };
    }
    case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.payload,
      };
    }
    case UNSELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: null,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        addedIngredients: action.payload,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        addedIngredients: action.payload,
      };
    }
    case CLEAR_INGREDIENTS: {
      return {
        ...state,
        addedIngredients: [],
      };
    }
    case SORT_INGREDIENTS: {
      return {
        ...state,
        addedIngredients: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
