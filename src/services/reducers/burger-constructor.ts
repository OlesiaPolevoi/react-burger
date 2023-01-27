import update from "immutability-helper";

import {
  ConstructorActions,
  TIngredientInfo,
  TIndex,
  TChangePosition,
  TConstructorAction,
} from "../../types/index";

export const constructorReducer = (
  state: TIngredientInfo[] = [],
  action: TConstructorAction
) => {
  switch (action.type) {
    case ConstructorActions.CONSTRUCTOR_ADD_ELEMENT: {
      const overwritePayload = action.payload as TIngredientInfo;

      const isIngredientBun = overwritePayload.type === "bun";

      const doesBunPresent = state?.some((el) => el?.type === "bun");

      if (isIngredientBun && doesBunPresent) {
        return state.map((el) => (el.type === "bun" ? action.payload : el));
      }
      return [...state, action.payload];
    }
    case ConstructorActions.CONSTRUCTOR_REMOVE_ELEMENT: {
      const overwritePayload = action.payload as TIndex;

      if (state.some((el) => el?.type === "bun")) {
        const filtered = state.filter(
          (el, index) => index !== overwritePayload + 1
        );
        return filtered;
      }
      const filtered = state.filter((el, index) => index !== overwritePayload);

      return filtered;
    }
    case ConstructorActions.CONSTRUCTOR_CHANGE_ELEMENT_POSITION: {
      const overwritePayload = action.payload as TChangePosition;

      const { firstElIndex, secondElIndex } = overwritePayload;
      const newArr = [...state];
      const filtered = newArr.filter((el) => el?.type !== "bun");

      const updated = update(filtered, {
        //@ts-ignore
        $splice: [
          [firstElIndex, 1],
          [secondElIndex, 0, filtered[firstElIndex]],
        ],
      });

      const bunIngredient = newArr.find((el) => {
        return el?.type === "bun";
      });

      if (bunIngredient) {
        updated.push(bunIngredient);
        updated.unshift(bunIngredient);
      }

      return updated;
    }
    case ConstructorActions.CONSTRUCTOR_CLEAR_ALL: {
      return [];
    }
    default: {
      return state;
    }
  }
};
