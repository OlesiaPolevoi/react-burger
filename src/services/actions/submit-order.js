import axios from "axios";
import { BASE_URL } from "../../utils/burger-api";

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

export const submitOrderAndGetId = (dataArray, callback) => {
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
