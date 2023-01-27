import {
  orderDetailsReducer,
  orderDetailsState,
} from "../services/reducers/submit-order";
import { OrderActions, TOrderDetailsAction } from "../types/index";

describe("testing constructorReducer", () => {
  it("should handle ORDER_NUMBER_REQUEST", () => {
    const orderActions: TOrderDetailsAction = {
      type: OrderActions.ORDER_NUMBER_REQUEST,
      payload: 123,
    };
    const result = orderDetailsReducer(orderDetailsState, orderActions);
    const expectedResult = { orderNumber: "", loading: true, error: "" };
    expect(result).toEqual(expectedResult);
  });

  it("should handle ORDER_NUMBER_SUCCESS", () => {
    const orderActions: TOrderDetailsAction = {
      type: OrderActions.ORDER_NUMBER_SUCCESS,
      payload: 123,
    };
    const result = orderDetailsReducer(orderDetailsState, orderActions);
    const expectedResult = {
      orderNumber: orderActions.payload,
      loading: false,
      error: "",
    };
    expect(result).toEqual(expectedResult);
  });

  it("should handle ORDER_NUMBER_FAILURE", () => {
    const orderActions: TOrderDetailsAction = {
      type: OrderActions.ORDER_NUMBER_FAILURE,
      payload: "errorMessage",
    };
    const result = orderDetailsReducer(orderDetailsState, orderActions);
    const expectedResult = {
      orderNumber: "",
      loading: false,
      error: orderActions.payload,
    };
    expect(result).toEqual(expectedResult);
  });

  it("should handle CLEAR_ORDER_NUMBER", () => {
    const orderActions: TOrderDetailsAction = {
      type: OrderActions.CLEAR_ORDER_NUMBER,
      payload: 123,
    };
    const result = orderDetailsReducer(orderDetailsState, orderActions);
    const expectedResult = { orderNumber: "", loading: false, error: "" };
    expect(result).toEqual(expectedResult);
  });
});
