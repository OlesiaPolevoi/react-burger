import axios from 'axios';
import { saveAccessToken, saveRefreshToken } from '../../utils/local-storage';
import { BASE_URL } from '../../utils/burger-api';
import { Dispatch } from 'react';
import { TUserData, TRegisterData } from '../../types/index';
export const USER_DATA_REQUEST = 'USER_DATA_REQUEST';
export const USER_DATA_SUCCESS = 'USER_DATA_SUCCESS';
export const USER_DATA_FAILURE = 'USER_DATA_FAILURE';

export const userDataRequest = () => {
  return {
    type: USER_DATA_REQUEST,
  };
};

export const userDataSuccess = (userData: TUserData) => {
  return {
    type: USER_DATA_SUCCESS,
    payload: userData,
  };
};

export const userDataFailure = (error: string) => {
  return {
    type: USER_DATA_FAILURE,
    payload: error,
  };
};

export const userLoginRequest = (userDataArray: any, callback: any) => {
  return function (dispatch: Dispatch<any>) {
    const data = JSON.stringify(userDataArray);
    const loginRequest = {
      method: 'post',
      url: `${BASE_URL}/auth/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    dispatch(userDataRequest());

    axios(loginRequest)
      .then(function (response) {
        const userData = response.data;
        dispatch(userDataSuccess(userData));

        saveAccessToken(userData.accessToken);
        saveRefreshToken(userData.refreshToken);

        callback();
      })
      .catch(function (error) {
        console.log(error);
        dispatch(userDataFailure(error.message));
      });
  };
};

export const userRegisterRequest = (
  userDataArray: TRegisterData,
  callback: () => void
) => {
  return function (dispatch: Dispatch<any>) {
    const data = JSON.stringify(userDataArray);
    const registerRequest = {
      method: 'post',
      url: `${BASE_URL}/auth/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    dispatch(userDataRequest());

    axios(registerRequest)
      .then(function (response) {
        const userData = response.data;

        dispatch(userDataSuccess(userData));
        callback();
      })
      .catch(function (error) {
        console.log(error);
        dispatch(userDataFailure(error.message));
      });
  };
};
