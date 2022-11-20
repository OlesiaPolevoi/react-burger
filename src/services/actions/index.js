import axios from "axios";
import { BASE_URL } from "../../utils/burger-api";
import { getIngredients } from "../../utils/burger-api";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (orderNumber) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: orderNumber,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const getIngredientsFunc = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios(getIngredients)
      .then(function (response) {
        const data = response?.data?.data;
        dispatch(fetchUserSuccess(data ?? []));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(fetchUserFailure(error.message));
      });
  };
};

export const ORDER_NUMBER_REQUEST = "ORDER_NUMBER_REQUEST";
export const ORDER_NUMBER_SUCCESS = "ORDER_NUMBER_SUCCESS";
export const ORDER_NUMBER_FAILURE = "ORDER_NUMBER_FAILURE";
export const CLEAR_ORDER_NUMBER = "CLEAR_ORDER_NUMBER";

export const orderNumberRequest = () => {
  return {
    type: ORDER_NUMBER_REQUEST,
  };
};

export const orderNumberSuccess = (orderNumber) => {
  return {
    type: ORDER_NUMBER_SUCCESS,
    payload: orderNumber,
  };
};

export const orderNumberFailure = (error) => {
  return {
    type: ORDER_NUMBER_FAILURE,
    payload: error,
  };
};

export const clearOrderNumber = () => {
  return {
    type: CLEAR_ORDER_NUMBER,
  };
};

export const makeOrderAndGetRequestId = (dataArray, callback) => {
  return function (dispatch) {
    const arrayOfIds = dataArray.map((el) => {
      return el._id;
    });

    const data = JSON.stringify({
      ingredients: arrayOfIds,
    });

    const getOrderNum = {
      method: "post",
      url: `${BASE_URL}/orders`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    dispatch(orderNumberRequest());
    axios(getOrderNum)
      .then(function (response) {
        const order = response.data;
        const orderNum = order.order.number;

        dispatch(orderNumberSuccess(orderNum));
        callback();
      })
      .catch(function (error) {
        console.log(error);
        dispatch(orderNumberFailure(error.message));
      });
  };
};
