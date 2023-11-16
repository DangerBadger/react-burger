/* eslint-disable import/prefer-default-export */
export const mockIngredient1 = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  calories: 4242,
  carbohydrates: 242,
  fat: 142,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  price: 424,
  __v: 0,
  uniqueId: expect.stringMatching(/^(?:[a-zA-Z0-9-]{36})$/g),
};

export const mockIngredient2 = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  price: 988,
  __v: 0,
  uniqueId: expect.stringMatching(/^(?:[a-zA-Z0-9-]{36})$/g),
};

export const stateWithMockIngredients = {
  ingredients: [mockIngredient1, mockIngredient2],
  addedIngredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  error: null,
};
