//import { string } from 'prop-types';

//ENUMS
export enum ConstructorActions {
  CONSTRUCTOR_ADD_ELEMENT = 'CONSTRUCTOR_ADD_ELEMENT',
  CONSTRUCTOR_REMOVE_ELEMENT = 'CONSTRUCTOR_REMOVE_ELEMENT',
  CONSTRUCTOR_CHANGE_ELEMENT_POSITION = 'CONSTRUCTOR_CHANGE_ELEMENT_POSITION',
  CONSTRUCTOR_CLEAR_ALL = 'CONSTRUCTOR_CLEAR_ALL',
}
export enum IngredientActions {
  FETCH_INGREDIENT_REQUEST = 'FETCH_INGREDIENT_REQUEST',
  FETCH_INGREDIENT_SUCCESS = 'FETCH_INGREDIENT_SUCCESS',
  FETCH_INGREDIENT_FAILURE = 'FETCH_INGREDIENT_FAILURE',
  INCREMENT_INGREDIENT_QUANTITY = 'INCREMENT_INGREDIENT_QUANTITY',
  DECREMENT_INGREDIENT_QUANTITY = 'DECREMENT_INGREDIENT_QUANTITY',
  CLEAR_COUNTER = 'CLEAR_COUNTER',
}
export enum IngredientInfoActions {
  GET_INGREDIENT_INFO = 'GET_INGREDIENT_INFO',
  CLEAR_INGREDIENT_INFO = 'CLEAR_INGREDIENT_INFO',
}
export enum OrderActions {
  ORDER_NUMBER_REQUEST = 'ORDER_NUMBER_REQUEST',
  ORDER_NUMBER_SUCCESS = 'ORDER_NUMBER_SUCCESS',
  ORDER_NUMBER_FAILURE = 'ORDER_NUMBER_FAILURE',
  CLEAR_ORDER_NUMBER = 'CLEAR_ORDER_NUMBER',
}
export enum UserDataActions {
  USER_DATA_REQUEST = 'USER_DATA_REQUEST',
  USER_DATA_SUCCESS = 'USER_DATA_SUCCESS',
  USER_DATA_FAILURE = 'USER_DATA_FAILURE',
}

export enum ProfileDataActions {
  PROFILE_DATA_REQUEST = 'PROFILE_DATA_REQUEST',
  PROFILE_DATA_SUCCESS = 'PROFILE_DATA_SUCCESS',
  PROFILE_DATA_FAILURE = 'PROFILE_DATA_FAILURE',
  PROFILE_DATA_UPDATE = 'PROFILE_DATA_UPDATE',
  CLEAR_PROFILE_DATA = 'CLEAR_PROFILE_DATA',
  ADD_TOKEN_TO_USER_STATE = 'ADD_TOKEN_TO_USER_STATE',
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

export type TIngredientDetailsAction = {
  type: IngredientInfoActions;
  payload: TIngredientInfo;
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

export type TOrderDetails = {
  orderNumber: string;
  loading: boolean;
  error: string;
};

export type TOrderNumber = number;

export type TOrderDetailsAction = {
  type: OrderActions;
  payload: TOrderNumber | TError;
};

export type TUserDataState = {
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  error: string;
};

// accessToken
// :
// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODc5ODdiOWI1MThhMDAxYmI4OWZlZSIsImlhdCI6MTY3MjAwNzYxMiwiZXhwIjoxNjcyMDA4ODEyfQ.P6gnQTQMjaond1wRI_jICr8gZJJipNZNhAA8xj5BVOQ"
// refreshToken
// :
// "ed74b4e5a1780669023663435abbe42d847da6f9d27e183e7d78ed3f51a6c2b7e0ffa3e786213f78"
// success
// :
// true
// user
// :
// {email: 'olesia.polevoi@gmail.com', name: 'Olesia311'} - userData sucess --++ TUserData

export type TUserSuccess = {
  success: boolean;
  user: { email: string; name: string };
};

export type TUserToken = {
  accessToken: string;
  refreshToken: string;
};

export type TUserDataReducerAction = {
  type: UserDataActions | ProfileDataActions;
  payload: TUserDataState | TError | TUserData | TUserSuccess | TUserToken;
};
