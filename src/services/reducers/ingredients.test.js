/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ingredientsReducer,
  addIngredient,
  deleteIngredient,
  clearIngredients,
  sortIngredients,
  initialState,
  getIngredients,
} from './ingredients';
import {
  mockIngredient1,
  mockIngredient2,
  mockGetIngredient1,
  mockGetIngredient2,
  stateWithMockIngredients,
} from '../../utils/mock-data';

describe('ingredients reducer', () => {
  // Синхронные экшены
  it('should RETURN initial state', () => {
    const result = ingredientsReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should ADD new ingredient with "addIngredient" action', () => {
    const action = { type: addIngredient.type, payload: [mockIngredient1] };
    const result = ingredientsReducer(initialState, action);

    expect(result.addedIngredients[0]).toEqual(mockIngredient1);
  });

  it('should DELETE ingredient with "deleteIngredient" action', () => {
    const action = { type: deleteIngredient.type, payload: [mockIngredient2] };
    const result = ingredientsReducer(stateWithMockIngredients, action);

    expect(result.addedIngredients).toEqual([mockIngredient2]);
  });

  it('should CLEAR addedIngredients with "clearIngredients" action', () => {
    const action = { type: clearIngredients.type };
    const result = ingredientsReducer(stateWithMockIngredients, action);

    expect(result.addedIngredients).toEqual([]);
  });

  it('shpuld SORT ingredients with "sortIngredients" action', () => {
    const action = {
      type: sortIngredients.type,
      payload: [mockIngredient2, mockIngredient1],
    };
    const result = ingredientsReducer(stateWithMockIngredients, action);

    expect(result.addedIngredients).toEqual([mockIngredient2, mockIngredient1]);
  });

  // Асинхронные thunk'и и их экшены
  global.fetch = jest.fn();

  it('should GET ingedients', async () => {
    const dispatch = jest.fn();
    const thunk = getIngredients();

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          data: [mockGetIngredient1, mockGetIngredient2],
          success: true,
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('ingredients/get/pending');
    expect(end[0].type).toBe('ingredients/get/fulfilled');
    expect(end[0].payload).toEqual([mockGetIngredient1, mockGetIngredient2]);
  });

  it('should REJECT GET ingedients', async () => {
    const dispatch = jest.fn();
    const thunk = getIngredients();

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('ingredients/get/pending');
    expect(end[0].type).toBe('ingredients/get/rejected');
    expect(end[0].payload).toBe('Ошибка загрузки ингредиентов');
  });

  it('should CHANGE status with getIngredients.pending action', () => {
    const result = ingredientsReducer(stateWithMockIngredients, getIngredients.pending());

    expect(result.ingredientsRequest).toBe(true);
    expect(result.error).toEqual(null);
    expect(result.ingredientsFailed).toBe(false);
  });

  it('should GET ingredients with getIngredients.fulfilled action', () => {
    const exampleIngredients = [mockGetIngredient1, mockGetIngredient2];
    const result = ingredientsReducer(initialState, getIngredients.fulfilled(exampleIngredients));

    expect(result.ingredients).toEqual(exampleIngredients);
    expect(result.ingredientsRequest).toBe(false);
  });

  it('should REJECT ingredients fetch with getIngredients.rejected action', () => {
    const result = ingredientsReducer(initialState, getIngredients.rejected('Ошибка загрузки ингредиентов'));

    expect(result.error).toBe('Ошибка загрузки ингредиентов');
    expect(result.ingredientsRequest).toBe(false);
  });
});
