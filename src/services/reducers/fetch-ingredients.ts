import {
  IngredientActions,
  TIngredientsInitialState,
  TIngredientsAction,
} from "../../types/index";

export const ingredientsInitialState: TIngredientsInitialState = {
  items: [],
  loading: false,
  error: "",
};

export const ingredientsReducer = (
  state = ingredientsInitialState,
  action: TIngredientsAction
) => {
  switch (action.type) {
    case IngredientActions.FETCH_INGREDIENT_REQUEST: {
      return { items: [], loading: true, error: "" };
    }
    case IngredientActions.FETCH_INGREDIENT_SUCCESS: {
      return { items: action.payload, loading: false, error: "" };
    }
    case IngredientActions.FETCH_INGREDIENT_FAILURE: {
      return { items: [], loading: false, error: action.payload };
    }
    case IngredientActions.INCREMENT_INGREDIENT_QUANTITY: {
      const ingredientId = action.payload;
      const isBun = state.items.some(
        (el) => el.type === "bun" && el._id === ingredientId
      );
      return {
        ...state,
        items: state.items.map((el) => {
          if (el.type === "bun" && el._id === ingredientId) {
            el.orderedQuantity = 2;
            return el;
          }
          if (el.type === "bun" && el._id !== ingredientId && isBun) {
            el.orderedQuantity = 0;
            return el;
          }
          if (el._id === ingredientId) {
            if (!("orderedQuantity" in el)) {
              el.orderedQuantity = 1;
              return el;
            }
            if ("orderedQuantity" in el && el.orderedQuantity !== undefined) {
              el.orderedQuantity = el.orderedQuantity + 1;
            }
          }
          return el;
        }),
      };
    }
    case IngredientActions.DECREMENT_INGREDIENT_QUANTITY: {
      const ingredientId = action.payload;
      return {
        ...state,
        items: state.items.map((el) => {
          if (el._id === ingredientId) {
            if (!("orderedQuantity" in el)) {
              return el;
            }
            if ("orderedQuantity" in el && el.orderedQuantity !== undefined) {
              const decrementedValue = el.orderedQuantity - 1;
              el.orderedQuantity = decrementedValue >= 0 ? decrementedValue : 0;
            }
          }
          return el;
        }),
      };
    }
    case IngredientActions.CLEAR_COUNTER: {
      return {
        ...state,
        items: state.items.map((el) => {
          if ("orderedQuantity" in el) {
            delete el.orderedQuantity;
            return el;
          }
          return el;
        }),
      };
    }
    default: {
      return state;
    }
  }
};
