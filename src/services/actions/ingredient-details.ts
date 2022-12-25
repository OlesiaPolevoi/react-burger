import { TIngredientInfo, IngredientInfoActions } from '../../types/index';

// export const GET_INGREDIENT_INFO = 'GET_INGREDIENT_INFO';
// export const CLEAR_INGREDIENT_INFO = 'CLEAR_INGREDIENT_INFO';

export const getIngredientInfo = (currentIngredient: TIngredientInfo) => {
  return {
    type: IngredientInfoActions.GET_INGREDIENT_INFO,
    payload: currentIngredient,
  };
};
export const clearIngredientInfo = () => {
  return {
    type: IngredientInfoActions.CLEAR_INGREDIENT_INFO,
  };
};
