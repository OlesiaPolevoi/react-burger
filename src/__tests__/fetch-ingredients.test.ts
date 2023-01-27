import {
  ingredientsReducer,
  ingredientsInitialState,
} from "../services/reducers/fetch-ingredients";

import {
  IngredientActions,
  TIngredientsInitialState,
  TIngredientsAction,
} from "../types/index";

describe("testing ingredientsReducer", () => {
  it("should handle FETCH_INGREDIENT_REQUEST", () => {
    const ingredientsAction: TIngredientsAction = {
      type: IngredientActions.FETCH_INGREDIENT_REQUEST,
      payload: [
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
      ],
    };

    const result = ingredientsReducer(
      ingredientsInitialState,
      ingredientsAction
    );

    const expectedResult = { items: [], loading: true, error: "" };
    expect(result).toEqual(expectedResult);
  });
  it("should handle FETCH_INGREDIENT_SUCCESS", () => {
    const ingredientsAction: TIngredientsAction = {
      type: IngredientActions.FETCH_INGREDIENT_SUCCESS,
      payload: [
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
      ],
    };

    const result = ingredientsReducer(
      ingredientsInitialState,
      ingredientsAction
    );

    const expectedResult = {
      items: ingredientsAction.payload,
      loading: false,
      error: "",
    };
    expect(result).toEqual(expectedResult);
  });
  it("should handle FETCH_INGREDIENT_FAILURE", () => {
    const ingredientsAction: TIngredientsAction = {
      type: IngredientActions.FETCH_INGREDIENT_FAILURE,
      payload: "errorMessage",
    };

    const result = ingredientsReducer(
      ingredientsInitialState,
      ingredientsAction
    );

    const expectedResult = {
      items: [],
      loading: false,
      error: ingredientsAction.payload,
    };
    expect(result).toEqual(expectedResult);
  });

  it("should handle INCREMENT_INGREDIENT_QUANTITY", () => {
    const ingredientsAction: TIngredientsAction = {
      type: IngredientActions.INCREMENT_INGREDIENT_QUANTITY,
      payload: "01",
    };

    const state: TIngredientsInitialState = {
      items: [
        {
          _id: "01",
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
      ],
      loading: false,
      error: "",
    };
    const result = ingredientsReducer(state, ingredientsAction);

    const expectedResult = {
      items: [
        {
          _id: "01",
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
          orderedQuantity: 1,
        },
      ],
      loading: false,
      error: "",
    };
    expect(result).toEqual(expectedResult);
  });

  it("should handle DECREMENT_INGREDIENT_QUANTITY", () => {
    const ingredientsAction: TIngredientsAction = {
      type: IngredientActions.DECREMENT_INGREDIENT_QUANTITY,
      payload: "01",
    };

    const state: TIngredientsInitialState = {
      items: [
        {
          _id: "01",
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
          orderedQuantity: 2,
        },
      ],
      loading: false,
      error: "",
    };
    const result = ingredientsReducer(state, ingredientsAction);

    const expectedResult = {
      items: [
        {
          _id: "01",
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
          orderedQuantity: 1,
        },
      ],
      loading: false,
      error: "",
    };
    expect(result).toEqual(expectedResult);
  });

  it("should handle CLEAR_COUNTER", () => {
    const ingredientsAction: TIngredientsAction = {
      type: IngredientActions.CLEAR_COUNTER,
      payload: "01",
    };

    const state: TIngredientsInitialState = {
      items: [
        {
          _id: "01",
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
          orderedQuantity: 1,
        },
      ],
      loading: false,
      error: "",
    };
    const result = ingredientsReducer(state, ingredientsAction);

    const expectedResult = {
      items: [
        {
          _id: "01",
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
      ],
      loading: false,
      error: "",
    };
    expect(result).toEqual(expectedResult);
  });
});
