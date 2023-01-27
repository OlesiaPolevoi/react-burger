import { ingredientDetailsReducer } from "../services/reducers/ingredient-details";

import {
  IngredientInfoActions,
  TIngredientInfo,
  TIngredientDetailsAction,
} from "../types/index";

describe("testing reducerWS", () => {
  it("should handle GET_INGREDIENT_INFO", () => {
    const ingredientDetailsAction: TIngredientDetailsAction = {
      type: IngredientInfoActions.GET_INGREDIENT_INFO,
      payload: {
        _id: "1",
        calories: 2,
        carbohydrates: 2,
        fat: 2,
        image: "someImage",
        image_large: "someLargeImage",
        image_mobile: "someMobileImage",
        name: "someName",
        price: 123,
        proteins: 423,
        type: "someType",
      },
    };

    const result = ingredientDetailsReducer(
      null,
      ingredientDetailsAction
    ) as TIngredientInfo;

    const expectedResult = ingredientDetailsAction.payload;
    expect(result).toEqual(expectedResult);
  });

  it("should handle CLEAR_INGREDIENT_INFO", () => {
    const ingredientDetailsAction: TIngredientDetailsAction = {
      type: IngredientInfoActions.CLEAR_INGREDIENT_INFO,
      payload: {
        _id: "1",
        calories: 2,
        carbohydrates: 2,
        fat: 2,
        image: "someImage",
        image_large: "someLargeImage",
        image_mobile: "someMobileImage",
        name: "someName",
        price: 123,
        proteins: 423,
        type: "someType",
      },
    };
    const result = ingredientDetailsReducer(
      null,
      ingredientDetailsAction
    ) as TIngredientInfo;

    const expectedResult = null;
    expect(result).toEqual(expectedResult);
  });
});
