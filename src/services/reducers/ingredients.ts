/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import api from '../../utils/Api';
import { IIngredient } from '../../utils/types';
import { isError } from '../../utils/utils';

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
  const response = await api.getIngredients();

  if (!response.success) {
    return rejectWithValue(response.message);
  }
  return response.data;
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
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.ingredientsRequest = false;
        console.error(action.payload);
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
