export interface IIngredientId {
  _id: string;
}

export interface IIngredient extends IIngredientId {
  name: string;
  type: string;
  proteins: number;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  price: number;
  __v: number;
  uniqueId?: string;
}

export type TUserInfo = {
  name: string;
  email: string;
  password?: string;
};

export interface IOrder {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}
