import axios from 'axios';
import { Dispatch } from 'react';
import { getAccessToken, saveAccessToken } from '../../utils/local-storage';
import { BASE_URL } from '../../utils/burger-api';
import {
  TProfileData,
  TTokenObject,
  TRegisterData,
  TRefreshToken,
  ProfileDataActions,
} from '../../types/index';

// export const PROFILE_DATA_REQUEST = 'PROFILE_DATA_REQUEST';
// export const PROFILE_DATA_SUCCESS = 'PROFILE_DATA_SUCCESS';
// export const PROFILE_DATA_FAILURE = 'PROFILE_DATA_FAILURE';
// export const PROFILE_DATA_UPDATE = 'PROFILE_DATA_UPDATE';
// export const CLEAR_PROFILE_DATA = 'CLEAR_PROFILE_DATA';

// export const ADD_TOKEN_TO_USER_STATE = 'ADD_TOKEN_TO_USER_STATE';

export const profileDataRequest = () => {
  return {
    type: ProfileDataActions.PROFILE_DATA_REQUEST,
  };
};

export const profileDataSuccess = (profileData: TProfileData) => {
  return {
    type: ProfileDataActions.PROFILE_DATA_SUCCESS,
    payload: profileData,
  };
};

export const profileDataFailure = (error: string) => {
  return {
    type: ProfileDataActions.PROFILE_DATA_FAILURE,
    payload: error,
  };
};

export const profileDataUpdate = () => {
  return {
    type: ProfileDataActions.PROFILE_DATA_UPDATE,
  };
};

export const clearProfileData = () => {
  return {
    type: ProfileDataActions.CLEAR_PROFILE_DATA,
  };
};

export const addTokenToUserState = (tokenObject: TTokenObject) => {
  return {
    type: ProfileDataActions.ADD_TOKEN_TO_USER_STATE,
    payload: tokenObject,
  };
};

export const profileInfoRequest = () => {
  return function (dispatch: Dispatch<any>) {
    const accessToken = getAccessToken();

    const getUserProfileData = {
      method: 'get',
      url: `${BASE_URL}/auth/user`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios(getUserProfileData)
      .then(function (response) {
        const userData = response.data;
        dispatch(profileDataSuccess(userData));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const profileInfoUpdate = (registerData: TRegisterData) => {
  return function (dispatch: Dispatch<any>) {
    const accessToken = getAccessToken();

    const data = JSON.stringify({
      name: registerData.name,
      email: registerData.email,
      password: '',
    });

    const updateInfo = {
      method: 'patch',
      url: `${BASE_URL}/auth/user`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    dispatch(profileDataRequest());

    axios(updateInfo)
      .then(function (response) {
        const receivedData = response.data;

        dispatch(profileDataSuccess(receivedData));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(profileDataFailure(error.message));
      });
  };
};

export const tokenRefreshRequest = (refreshToken: TRefreshToken) => {
  console.log('refreshToken', refreshToken);

  return function (dispatch: Dispatch<any>) {
    const data = JSON.stringify({
      token: refreshToken,
    });

    const config = {
      method: 'post',
      url: `${BASE_URL}/auth/token`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    axios(config)
      .then(function (response) {
        const userData = response.data;
        saveAccessToken(userData.accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const userExitRequest = (refreshToken: TRefreshToken) => {
  return function (dispatch: Dispatch<any>) {
    const data = JSON.stringify({
      token: refreshToken,
    });

    const config = {
      method: 'post',
      url: `${BASE_URL}/auth/logout`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    axios(config)
      .then(function (response) {
        dispatch(clearProfileData());
        localStorage.clear();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
