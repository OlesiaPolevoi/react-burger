import { Dispatch } from 'react';
import axios from 'axios';
import { getIngredients } from '../../utils/burger-api';
import { IngredientActions, TIngredientInfo } from '../../types/index';

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
