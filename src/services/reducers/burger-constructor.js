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
      return state.filter((el, index) => index !== action.payload);
    }
    case CONSTRUCTOR_CHANGE_ELEMENT_POSITION: {
      const { firstElIndex, secondElIndex } = action.payload;

      const newArr = [...state];

      // const firstEl = newArr[firstElIndex];
      // const secondEl = newArr[secondElIndex];
      // newArr.splice(firstElIndex, 1, secondEl);
      // newArr.splice(secondElIndex, 1, firstEl);

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
