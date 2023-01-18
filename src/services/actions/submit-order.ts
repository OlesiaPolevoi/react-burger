import axios from "axios";
import { BASE_URL } from "../../utils/burger-api";
import { Dispatch } from "react";
import { TIngredientInfo, OrderActions } from "../../types/index";
// export const ORDER_NUMBER_REQUEST = 'ORDER_NUMBER_REQUEST';
// export const ORDER_NUMBER_SUCCESS = 'ORDER_NUMBER_SUCCESS';
// export const ORDER_NUMBER_FAILURE = 'ORDER_NUMBER_FAILURE';
// export const CLEAR_ORDER_NUMBER = 'CLEAR_ORDER_NUMBER';

export const orderNumberRequest = () => {
  return {
    type: OrderActions.ORDER_NUMBER_REQUEST,
  };
};

export const orderNumberSuccess = (orderNumber: number) => {
  return {
    type: OrderActions.ORDER_NUMBER_SUCCESS,
    payload: orderNumber,
  };
};

export const orderNumberFailure = (error: string) => {
  return {
    type: OrderActions.ORDER_NUMBER_FAILURE,
    payload: error,
  };
};

export const clearOrderNumber = () => {
  return {
    type: OrderActions.CLEAR_ORDER_NUMBER,
  };
};

export const submitOrderAndGetId = (
  dataArray: TIngredientInfo[],
  openModal: () => void,
  clearConstructor: () => void,
  clearCounter: () => void,
  auth: string
) => {
  return function (dispatch: Dispatch<any>) {
    const arrayOfIds = dataArray.map((el: TIngredientInfo) => {
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
        Authorization: `Bearer ${auth}`,
      },
      data,
    };

    dispatch(orderNumberRequest());

    axios(getOrderNum)
      .then(function (response) {
        const order = response.data;
        const orderNum = order.order.number;

        dispatch(orderNumberSuccess(orderNum));
        openModal();
        clearConstructor();
        clearCounter();
      })
      .catch(function (error) {
        console.log(error);
        dispatch(orderNumberFailure(error.message));
      });
  };
};
