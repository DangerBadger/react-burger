/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import api from '../../utils/Api';

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getIngredients();

      if (!response.success) {
        throw new Error('Ошибка запроса');
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const ingredientsState = {
  ingredients: [],
  selectedIngredient: null,
  addedIngredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: ingredientsState,
  reducers: {
    selectIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    unselectIngredient: (state) => {
      state.selectedIngredient = null;
    },
    addIngredient: (state, action) => {
      const enhancedArr = action.payload.map((ingredient) => {
        const ingredientDuplicate = { ...ingredient };
        ingredientDuplicate.uniqueId = uuidv4();
        return ingredientDuplicate;
      });

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
        state.ingredientsFailed = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.ingredientsRequest = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
        console.warn(action.payload);
      });
  },
});

export const {
  selectIngredient,
  unselectIngredient,
  addIngredient,
  deleteIngredient,
  clearIngredients,
  sortIngredients,
} = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
