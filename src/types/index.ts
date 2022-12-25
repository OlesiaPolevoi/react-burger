//import { string } from 'prop-types';

//ENUMS

export enum ConstructorActions {
  CONSTRUCTOR_ADD_ELEMENT = 'CONSTRUCTOR_ADD_ELEMENT',
  CONSTRUCTOR_REMOVE_ELEMENT = 'CONSTRUCTOR_REMOVE_ELEMENT',
  CONSTRUCTOR_CHANGE_ELEMENT_POSITION = 'CONSTRUCTOR_CHANGE_ELEMENT_POSITION',
  CONSTRUCTOR_CLEAR_ALL = 'CONSTRUCTOR_CLEAR_ALL',
}

export enum IngredientActions {
  // ZERO_ACTION,
  FETCH_INGREDIENT_REQUEST = 'FETCH_INGREDIENT_REQUEST',
  FETCH_INGREDIENT_SUCCESS = 'FETCH_INGREDIENT_SUCCESS',
  FETCH_INGREDIENT_FAILURE = 'FETCH_INGREDIENT_FAILURE',
  INCREMENT_INGREDIENT_QUANTITY = 'INCREMENT_INGREDIENT_QUANTITY',
  DECREMENT_INGREDIENT_QUANTITY = 'DECREMENT_INGREDIENT_QUANTITY',
  CLEAR_COUNTER = 'CLEAR_COUNTER',
}

// export const GET_INGREDIENT_INFO = 'GET_INGREDIENT_INFO';
// export const CLEAR_INGREDIENT_INFO = 'CLEAR_INGREDIENT_INFO';
//TYPES
export type TIngredientInfo = {
  _id: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  orderedQuantity?: number;
};

export type TElemWithId = TIngredientInfo & {
  uuid: string;
};

export type TIndex = number;

export type TChangePosition = {
  firstElIndex: number;
  secondElIndex: number;
};

export type TConstructorAction = {
  type: ConstructorActions;
  payload: TElemWithId | TIndex | TChangePosition;
};

export type TError = string;
export type TId = string;

export type TIngredientsAction = {
  type: IngredientActions;
  payload: TIngredientInfo[] | TError | TId;
};

export type TProfileData = {
  success: boolean;
  user: { email: string; name: string };
};

export type TTokenObject = {
  accessToken: string;
  refreshToken: string;
};

export type TUserData = TTokenObject & {
  success: boolean;
  user: { email: string; name: string };
};

export type TRegisterData = {
  name: string;
  email: string;
  password: string;
};

export type TRefreshToken = {
  refreshToken: string;
};

export type TIngredientsInitialState = {
  items: TIngredientInfo[];
  loading: boolean;
  error: string;
};
