// import {
//   CONSTRUCTOR_REMOVE_ELEMENT,
//   CONSTRUCTOR_ADD_ELEMENT,
//   CONSTRUCTOR_CHANGE_ELEMENT_POSITION,
//   CONSTRUCTOR_CLEAR_ALL,
// } from '../actions/burger-constructor';
import update from 'immutability-helper';
//import { number } from 'prop-types';
import {
  ConstructorActions,
  TIngredientInfo,
  TElemWithId,
  TIndex,
  TChangePosition,
  TConstructorAction,
} from '../../types/index';
// export const CONSTRUCTOR_ADD_ELEMENT = "CONSTRUCTOR_ADD_ELEMENT";
// export const CONSTRUCTOR_REMOVE_ELEMENT = "CONSTRUCTOR_REMOVE_ELEMENT";
// export const CONSTRUCTOR_CHANGE_ELEMENT_POSITION =
//   "CONSTRUCTOR_CHANGE_ELEMENT_POSITION";
// export const CONSTRUCTOR_CLEAR_ALL = "CONSTRUCTOR_CLEAR_ALL";
// enum ConstructorActions {
//   CONSTRUCTOR_ADD_ELEMENT,
//   CONSTRUCTOR_REMOVE_ELEMENT,
//   CONSTRUCTOR_CHANGE_ELEMENT_POSITION,
//   CONSTRUCTOR_CLEAR_ALL
// }

export const constructorReducer = (
  state: TIngredientInfo[] = [],
  action: TConstructorAction
) => {
  switch (action.type) {
    case ConstructorActions.CONSTRUCTOR_ADD_ELEMENT: {
      const overwritePayload = action.payload as TElemWithId;

      const isIngredientBun = overwritePayload.type === 'bun';

      const doesBunPresent = state.some((el) => el?.type === 'bun');
      if (isIngredientBun && doesBunPresent) {
        return state.map((el) => (el.type === 'bun' ? action.payload : el));
      }
      return [...state, action.payload];
    }
    case ConstructorActions.CONSTRUCTOR_REMOVE_ELEMENT: {
      const overwritePayload = action.payload as TIndex;

      if (state.some((el) => el?.type === 'bun')) {
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
      const filtered = newArr.filter((el) => el?.type !== 'bun');

      const updated = update(filtered, {
        //@ts-ignore
        $splice: [
          [firstElIndex, 1],
          [secondElIndex, 0, filtered[firstElIndex]],
        ],
      });

      const bunIngredient = newArr.find((el) => {
        return el?.type === 'bun';
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
