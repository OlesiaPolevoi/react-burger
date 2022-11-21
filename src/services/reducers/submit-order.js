import {
  ORDER_NUMBER_REQUEST,
  ORDER_NUMBER_SUCCESS,
  ORDER_NUMBER_FAILURE,
  CLEAR_ORDER_NUMBER,
} from "../actions/submit-order";

const orderDetailsState = {
  orderNumber: "",
  loading: false,
  error: "",
};

export const orderDetailsReducer = (state = orderDetailsState, action) => {
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
