/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from '../../utils/types';
import {
  ingredientsReducer,
  addIngredient,
  deleteIngredient,
  clearIngredients,
  sortIngredients,
  initialState,
} from './ingredients';
import {
  mockIngredient1,
  mockIngredient2,
  stateWithMockIngredients,
} from '../../utils/mock-data';

// describe('ingredients reducer', () => {
//   let store = configureStore({
//     reducer: ingredientsReducer,
//     preloadedState: initialState,
//   });

//   beforeEach(() => {
//     store = configureStore({
//       reducer: ingredientsReducer,
//       preloadedState: initialState,
//     });
//   });

//   afterEach(() => {
//     jest.spyOn(global, 'fetch').mockClear();
//   });

//   test('Should return initial state', () => {
//     expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
//   });

//   test('Should add new ingredient', () => {
//     expect(
//       ingredientsReducer(initialState, addIngredient([mockIngredient]))
//     ).toEqual({
//       ...initialState,
//       addedIngredients: [...initialState.addedIngredients, mockIngredient],
//     });
//   });
// });

describe('ingredients reducer', () => {
  it('should RETURN INITIAL state', () => {
    const result = ingredientsReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should add new ingredient with "addIngredient" action', () => {
    const action = { type: addIngredient.type, payload: [mockIngredient1] };
    const result = ingredientsReducer(initialState, action);

    expect(result.addedIngredients[0]).toEqual(mockIngredient1);
  });

  it('should DELETE ingredient', () => {
    const action = { type: deleteIngredient.type, payload: [mockIngredient2] };
    const result = ingredientsReducer(stateWithMockIngredients, action);

    expect(result.addedIngredients).toEqual([mockIngredient2]);
  });

  it('should CLEAR addedIngredients', () => {
    const action = { type: clearIngredients.type };
    const result = ingredientsReducer(stateWithMockIngredients, action);

    expect(result.addedIngredients).toEqual([]);
  });

  it('shpuld SORT ingredients', () => {
    const action = {
      type: sortIngredients.type,
      payload: [mockIngredient2, mockIngredient1],
    };
    const result = ingredientsReducer(stateWithMockIngredients, action);

    expect(result.addedIngredients).toEqual([mockIngredient2, mockIngredient1]);
  });
});
