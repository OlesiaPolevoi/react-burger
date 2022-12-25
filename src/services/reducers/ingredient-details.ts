// import {
//   GET_INGREDIENT_INFO,
//   CLEAR_INGREDIENT_INFO,
// } from '../actions/ingredient-details';

import {
  IngredientInfoActions,
  TIngredientInfo,
  TIngredientDetailsAction,
} from '../../types/index';

const defaultIngredientState = null;

export const ingredientDetailsReducer = (
  state: TIngredientInfo | null = defaultIngredientState,
  action: TIngredientDetailsAction
) => {
  switch (action.type) {
    case IngredientInfoActions.GET_INGREDIENT_INFO: {
      return { ...action.payload };
    }
    case IngredientInfoActions.CLEAR_INGREDIENT_INFO: {
      return null;
    }
    default:
      return state;
  }
};
