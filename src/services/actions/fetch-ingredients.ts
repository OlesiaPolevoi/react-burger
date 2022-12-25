import { Dispatch } from 'react';
import axios from 'axios';
import { getIngredients } from '../../utils/burger-api';
import { IngredientActions, TIngredientInfo } from '../../types/index';

// export const FETCH_INGREDIENT_REQUEST = 'FETCH_INGREDIENT_REQUEST';
// export const FETCH_INGREDIENT_SUCCESS = 'FETCH_INGREDIENT_SUCCESS';
// export const FETCH_INGREDIENT_FAILURE = 'FETCH_INGREDIENT_FAILURE';

export const INCREMENT_INGREDIENT_QUANTITY = 'INCREMENT_INGREDIENT_QUANTITY';
export const DECREMENT_INGREDIENT_QUANTITY = 'DECREMENT_INGREDIENT_QUANTITY';
export const CLEAR_COUNTER = 'CLEAR_COUNTER';

export const fetchIngredientRequest = () => {
  return {
    type: IngredientActions.FETCH_INGREDIENT_REQUEST,
  };
};

export const fetchIngredientSuccess = (data: TIngredientInfo[]) => {
  return {
    type: IngredientActions.FETCH_INGREDIENT_SUCCESS,
    payload: data,
  };
};

export const fetchIngredientFailure = (error: string) => {
  return {
    type: IngredientActions.FETCH_INGREDIENT_FAILURE,
    payload: error,
  };
};

export const getIngredientsFunc = () => {
  return function (dispatch: Dispatch<any>) {
    dispatch(fetchIngredientRequest());
    axios(getIngredients)
      .then(function (response) {
        const data = response?.data?.data;
        dispatch(fetchIngredientSuccess(data ?? []));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(fetchIngredientFailure(error.message));
      });
  };
};
