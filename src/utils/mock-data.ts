export const mockUserRegistrationData = {
  email: 'example@mail.com',
  password: '123Qwerty',
  name: 'Ivan',
};

export const mockUser = {
  success: true,
  user: {
    email: 'ghg@mail.com',
    name: 'glip',
  },
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWI5YzdhYzJjYzYxMDAxYjNkOTJkMSIsImlhdCI6MTcwMDUwMjY1MCwiZXhwIjoxNzAwNTAzODUwfQ.vwc5JkIC7VRXEbf3nFeySER0Al3l_Hajc_5dKQbjwr4',
  refreshToken:
    '2c020fdc28c3c2c75c025efdcdd6dd04264ba7e1d5512492d975e3a128c4baad010ee54c33d69d39',
};

export const mockOrder = {
  name: 'Space флюоресцентный spicy бургер',
  order: {
    number: 26509,
  },
  success: true,
};

export const stateWithMockOrder = {
  orders: null,
  orderDetails: mockOrder,
  orderRequest: false,
  orderFailed: true,
  error: 'Error',
  wsOpen: true,
  wsUrl: 'wss://norma.nomoreparties.space',
  wsConnected: true,
  wsError: 'Error',
  wsCloseCode: '',
};

export const mockOrders = {
  success: true,
  orders: [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d',
      ],
      name: 'Space флюоресцентный бургер',
      _id: '64f8aa3e6d2997001caa699c',
      status: 'done',
      number: 25789,
      createdAt: '2023-11-18T14:26:11.545Z',
      updatedAt: '2023-11-18T14:26:11.625Z',
    },
    {
      ingredients: [
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d',
      ],
      name: 'Space флюоресцентный бургер',
      _id: '64f8aa3e6d2997001caa699f',
      status: 'done',
      number: 25789,
      createdAt: '2023-11-18T15:26:11.545Z',
      updatedAt: '2023-11-18T15:26:11.625Z',
    },
  ],
  total: 26385,
  totalToday: 63,
};

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

export const mockGetIngredient1 = {
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

export const mockGetIngredient2 = {
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
  ingredientsFailed: true,
  error: null,
};

export const mockIngredientsArray = [
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa093d',
  '643d69a5c3f7b9001cfa093d',
];
