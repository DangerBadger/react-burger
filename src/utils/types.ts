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
}

export interface IAddedIngredient extends IIngredient {
  uniqueId?: string;
}
