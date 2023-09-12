export const apiSettings = {
  url: 'https://norma.nomoreparties.space/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const tabs = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',
};

export const preparationStageTexts = {
  cooking: 'Ваш заказ начали готовить',
  error: 'Заказ не удалось обработать',
};

export const paths = {
  mainPage: '/',
  registerPage: '/register',
  loginPage: '/login',
  profilePage: '/profile',
  forgotPasswordPage: '/forgot-password',
  resetPasswordPage: '/reset-password',
  ingredientsPage: 'ingredients/',
  ingredientsIdPage: 'ingredients/:id',
  notFoundPage: '*',
};
