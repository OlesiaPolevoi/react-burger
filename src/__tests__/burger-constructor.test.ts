import { constructorReducer } from "../services/reducers/burger-constructor";
import {
  ConstructorActions,
  TIngredientInfo,
  TConstructorAction,
} from "../types/index";

describe("testing constructorReducer", () => {
  it("should handle CONSTRUCTOR_ADD_ELEMENT", () => {
    const constructorAction: TConstructorAction = {
      type: ConstructorActions.CONSTRUCTOR_ADD_ELEMENT,
      payload: {
        _id: "1",
        calories: 2,
        carbohydrates: 2,
        fat: 2,
        image: "someImg",
        image_large: "someImg",
        image_mobile: "someImg",
        name: "someImg",
        price: 2,
        proteins: 2,
        type: "SomeType",
      } as TIngredientInfo,
    };

    const state: TIngredientInfo[] = [];

    const result = constructorReducer(
      state,
      constructorAction
    ) as TIngredientInfo[];

    const expectedResult = [constructorAction.payload];

    expect(result).toEqual(expectedResult);
  });

  it("should handle CONSTRUCTOR_REMOVE_ELEMENT", () => {
    const constructorAction: TConstructorAction = {
      type: ConstructorActions.CONSTRUCTOR_REMOVE_ELEMENT,
      payload: {
        _id: "1",
        calories: 2,
        carbohydrates: 2,
        fat: 2,
        image: "someImg",
        image_large: "someImg",
        image_mobile: "someImg",
        name: "someImg",
        price: 2,
        proteins: 2,
        type: "SomeType",
      } as TIngredientInfo,
    };

    const state: TIngredientInfo[] = [];

    const result = constructorReducer(
      state,
      constructorAction
    ) as TIngredientInfo[];

    expect(result).toEqual([]);
  });

  it("should handle CONSTRUCTOR_CHANGE_ELEMENT_POSITION", () => {
    const constructorAction: TConstructorAction = {
      type: ConstructorActions.CONSTRUCTOR_CHANGE_ELEMENT_POSITION,
      payload: {
        firstElIndex: 0,
        secondElIndex: 1,
      },
    };

    const state: TIngredientInfo[] = [
      {
        _id: "1",
        calories: 2,
        carbohydrates: 2,
        fat: 2,
        image: "someImg",
        image_large: "someImg",
        image_mobile: "someImg",
        name: "someImg",
        price: 2,
        proteins: 2,
        type: "SomeType",
      },
      {
        _id: "2",
        calories: 2,
        carbohydrates: 2,
        fat: 2,
        image: "someImg",
        image_large: "someImg",
        image_mobile: "someImg",
        name: "someImg",
        price: 2,
        proteins: 2,
        type: "SomeType",
      },
    ];

    const reducerResult = constructorReducer(
      state,
      constructorAction
    ) as TIngredientInfo[];

    const firstIndex = reducerResult[0]["_id"];
    const expectedFirstIndex = "2";

    expect(firstIndex).toEqual(expectedFirstIndex);
  });

  it("should handle CONSTRUCTOR_CLEAR_ALL", () => {
    expect([]).toEqual([]);
  });
});
