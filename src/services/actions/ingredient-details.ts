import { TIngredientInfo, IngredientInfoActions } from "../../types/index";

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
