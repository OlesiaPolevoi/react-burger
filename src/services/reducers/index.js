import { combineReducers } from "redux";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  ORDER_NUMBER_REQUEST,
  ORDER_NUMBER_SUCCESS,
  ORDER_NUMBER_FAILURE,
  CLEAR_ORDER_NUMBER,
} from "../actions/index.js";

const ingredientsInitialState = {
  items: [],
  loading: false,
  error: "",
};

const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST: {
      return { items: [], loading: true, error: "" };
    }
    case FETCH_USER_SUCCESS: {
      return { items: action.payload, loading: false, error: "" };
    }
    case FETCH_USER_FAILURE: {
      return { items: [], loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

const orderDetailsState = {
  orderNumber: "",
  loading: false,
  error: "",
};

const orderDetailsReducer = (state = orderDetailsState, action) => {
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

export default combineReducers({
  orderDetailsReducer,
  ingredientsReducer,
});
