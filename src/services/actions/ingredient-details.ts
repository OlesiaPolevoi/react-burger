import { TIngredientInfo } from '../../types/index';

export const GET_INGREDIENT_INFO = 'GET_INGREDIENT_INFO';
export const CLEAR_INGREDIENT_INFO = 'CLEAR_INGREDIENT_INFO';

export const getIngredientInfo = (currentIngredient: TIngredientInfo) => {
  return {
    type: GET_INGREDIENT_INFO,
    payload: currentIngredient,
  };
};
export const clearIngredientInfo = () => {
  return {
    type: CLEAR_INGREDIENT_INFO,
  };
};
