/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import api from '../../utils/Api';
import { IIngredient } from '../../utils/types';

type TInitialState = {
  ingredients: Array<IIngredient>;
  addedIngredients: Array<IIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  error: string | null;
};

export const getIngredients = createAsyncThunk<
  IIngredient[],
  undefined,
  { rejectValue: string }
>('ingredients/get', async (_, { rejectWithValue }) => {
  try {
    const response = await api.getIngredients();

    if (!response.success) {
      throw new Error('Ошибка загрузки ингредиентов');
    }
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
  }
});

export const initialState: TInitialState = {
  ingredients: [],
  addedIngredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Array<IIngredient>>) => {
      const enhancedArr: Array<IIngredient> = action.payload.map(
        (ingredient) => {
          const ingredientDuplicate: IIngredient = { ...ingredient };
          ingredientDuplicate.uniqueId = uuidv4();
          return ingredientDuplicate;
        }
      );

      state.addedIngredients = enhancedArr;
    },
    deleteIngredient: (state, action) => {
      state.addedIngredients = action.payload;
    },
    clearIngredients: (state) => {
      state.addedIngredients = [];
    },
    sortIngredients: (state, action) => {
      state.addedIngredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.ingredientsRequest = true;
        state.error = null;
        state.ingredientsFailed = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.ingredientsRequest = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        if (typeof action.error.message !== 'undefined') {
          state.error = action.error.message;
        }
        state.ingredientsRequest = false;
        console.log(action.error.message);
      });
  },
});

export const {
  addIngredient,
  deleteIngredient,
  clearIngredients,
  sortIngredients,
} = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
