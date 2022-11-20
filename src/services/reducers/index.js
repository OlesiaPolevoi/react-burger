import { combineReducers } from "redux";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  ORDER_NUMBER_REQUEST,
  ORDER_NUMBER_SUCCESS,
  ORDER_NUMBER_FAILURE,
  CLEAR_ORDER_NUMBER,
  CONSTRUCTOR_REMOVE_ELEMENT,
  CONSTRUCTOR_ADD_ELEMENT,
  INCREMENT_INGREDIENT_QUANTITY,
  DECREMENT_INGREDIENT_QUANTITY,
  CONSTRUCTOR_CHANGE_ELEMENT_POSITION,
} from "../actions/index.js";
import update from "immutability-helper";

const ingredientsInitialState = {
  items: [],
  loading: false,
  error: "",
};

const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST: {
      return { items: [], loading: true, error: "" };
    }
    case FETCH_USER_SUCCESS: {
      return { items: action.payload, loading: false, error: "" };
    }
    case FETCH_USER_FAILURE: {
      return { items: [], loading: false, error: action.payload };
    }
    case INCREMENT_INGREDIENT_QUANTITY: {
      const ingredientId = action.payload;
      const isBun = state.items.some(
        (el) => el.type === "bun" && el._id === ingredientId
      );
      return {
        ...state,
        items: state.items.map((el) => {
          if (el.type === "bun" && el._id === ingredientId) {
            el["orderedQuantity"] = 2;
            return el;
          }

          if (el.type === "bun" && el._id !== ingredientId && isBun) {
            el["orderedQuantity"] = 0;
            return el;
          }

          if (el._id === ingredientId) {
            if (!("orderedQuantity" in el)) {
              el["orderedQuantity"] = 1;
              return el;
            }
            el["orderedQuantity"] = el["orderedQuantity"] + 1;
          }
          return el;
        }),
      };
    }
    case DECREMENT_INGREDIENT_QUANTITY: {
      const ingredientId = action.payload;
      return {
        ...state,
        items: state.items.map((el) => {
          if (el._id === ingredientId) {
            if (!("orderedQuantity" in el)) {
              return el;
            }
            const decrementedValue = el["orderedQuantity"] - 1;
            el["orderedQuantity"] =
              decrementedValue >= 0 ? decrementedValue : 0;
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

const orderDetailsState = {
  orderNumber: "",
  loading: false,
  error: "",
};

const orderDetailsReducer = (state = orderDetailsState, action) => {
  switch (action.type) {
    case ORDER_NUMBER_REQUEST: {
      return { orderNumber: "", loading: true, error: "" };
    }
    case ORDER_NUMBER_SUCCESS: {
      return {
        loading: false,
        error: "",
        orderNumber: action.payload,
      };
    }
    case ORDER_NUMBER_FAILURE: {
      return {
        loading: false,
        error: action.payload,
        orderNumber: "",
      };
    }
    case CLEAR_ORDER_NUMBER: {
      return { orderNumber: "", loading: false, error: "" };
    }
    default: {
      return state;
    }
  }
};

const constructorReducer = (state = [], action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD_ELEMENT: {
      const isIngredientBun = action.payload.type === "bun";
      const doesBunPresent = state.some((el) => el.type === "bun");
      if (isIngredientBun && doesBunPresent) {
        return state.map((el) => (el.type === "bun" ? action.payload : el));
      }
      return [...state, action.payload];
    }
    case CONSTRUCTOR_REMOVE_ELEMENT: {
      return state.filter((el, index) => index !== action.payload);
    }
    case CONSTRUCTOR_CHANGE_ELEMENT_POSITION: {
      const { firstElIndex, secondElIndex } = action.payload;

      const newArr = [...state];

      return update(newArr, {
        $splice: [
          [firstElIndex, 1],
          [secondElIndex, 0, newArr[firstElIndex]],
        ],
      });
    }

    default: {
      return state;
    }
  }
};

export default combineReducers({
  orderDetailsReducer,
  ingredientsReducer,
  constructorReducer,
});
