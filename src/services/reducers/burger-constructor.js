import {
  CONSTRUCTOR_REMOVE_ELEMENT,
  CONSTRUCTOR_ADD_ELEMENT,
  CONSTRUCTOR_CHANGE_ELEMENT_POSITION,
} from "../actions/burger-constructor";
import update from "immutability-helper";

export const constructorReducer = (state = [], action) => {
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
      if (state.some((el) => el.type === "bun")) {
        const filtered = state.filter(
          (el, index) => index !== action.payload + 1
        );
        return filtered;
      }
      const filtered = state.filter((el, index) => index !== action.payload);
      return filtered;
    }
    case CONSTRUCTOR_CHANGE_ELEMENT_POSITION: {
      const { firstElIndex, secondElIndex } = action.payload;

      const newArr = [...state];
      const filtered = newArr.filter((el) => el.type !== "bun");

      const updated = update(filtered, {
        $splice: [
          [firstElIndex, 1],
          [secondElIndex, 0, filtered[firstElIndex]],
        ],
      });

      const bunIngredient = newArr.find((el) => {
        return el.type === "bun";
      });

      updated.push(bunIngredient);
      updated.unshift(bunIngredient);
      return updated;
    }

    default: {
      return state;
    }
  }
};
