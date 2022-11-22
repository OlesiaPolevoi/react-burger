import {
  GET_INGREDIENT_INFO,
  CLEAR_INGREDIENT_INFO,
} from "../actions/ingredient-details";

const defaultIngredientState = null;

export const ingredientDetailsReducer = (
  state = defaultIngredientState,
  action
) => {
  switch (action.type) {
    case GET_INGREDIENT_INFO: {
      return { ...action.payload };
    }
    case CLEAR_INGREDIENT_INFO: {
      return null;
    }
    default:
      return state;
  }
};
