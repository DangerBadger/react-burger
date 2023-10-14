export const apiSettings = {
  url: 'https://norma.nomoreparties.space/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export enum Tabs {
  BUN = 'bun',
  SAUCE = 'sauce',
  MAIN = 'main',
}

export enum PreparationStageTexts {
  cooking = 'Ваш заказ начали готовить',
  error = 'Заказ не удалось обработать',
}

export enum Paths {
  mainPage = '/',
  feed = '/feed/',
  feedDetails = '/feed/:id',
  registerPage = '/register',
  loginPage = '/login',
  profilePage = '/profile',
  forgotPasswordPage = '/forgot-password',
  resetPasswordPage = '/reset-password',
  ingredientsPage = 'ingredients/',
  ingredientsIdPage = 'ingredients/:id',
  notFoundPage = '*',
}
