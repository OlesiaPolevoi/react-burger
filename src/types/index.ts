//import { string } from 'prop-types';

//ENUMS

export enum ConstructorActions {
  CONSTRUCTOR_ADD_ELEMENT,
  CONSTRUCTOR_REMOVE_ELEMENT,
  CONSTRUCTOR_CHANGE_ELEMENT_POSITION,
  CONSTRUCTOR_CLEAR_ALL,
}

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
};
export type TElemWithId = TIngredientInfo & {
  uuid: string;
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

export type TIndex = number;

export type TChangePosition = {
  firstElIndex: number;
  secondElIndex: number;
};

export type TConstructorAction = {
  type: ConstructorActions;
  payload: TElemWithId | TIndex | TChangePosition;
};
