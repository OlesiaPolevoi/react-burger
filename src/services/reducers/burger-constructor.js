import {
  CONSTRUCTOR_REMOVE_ELEMENT,
  CONSTRUCTOR_ADD_ELEMENT,
  CONSTRUCTOR_CHANGE_ELEMENT_POSITION,
  CONSTRUCTOR_CLEAR_ALL,
} from "../actions/burger-constructor";
import update from "immutability-helper";
import uuid from "react-uuid";

export const constructorReducer = (state = [], action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD_ELEMENT: {
      const uniqueId = uuid();

      const newElementToAdd = { ...action.payload, uuid: uniqueId };

      const isIngredientBun = action.payload.type === "bun";
      const doesBunPresent = state.some((el) => el.type === "bun");
      if (isIngredientBun && doesBunPresent) {
        return state.map((el) => (el.type === "bun" ? newElementToAdd : el));
      }
      return [...state, newElementToAdd];
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
    case CONSTRUCTOR_CLEAR_ALL: {
      return [];
    }
    default: {
      return state;
    }
  }
};
