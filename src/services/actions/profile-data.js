import axios from "axios";
import { getAccessToken, saveAccessToken } from "../../utils/local-storage";
import { USER_URL } from "../../utils/user-api";

export const PROFILE_DATA_REQUEST = "PROFILE_DATA_REQUEST";
export const PROFILE_DATA_SUCCESS = "PROFILE_DATA_SUCCESS";
export const PROFILE_DATA_FAILURE = "PROFILE_DATA_FAILURE";
export const PROFILE_DATA_UPDATE = "PROFILE_DATA_UPDATE";
export const CLEAR_PROFILE_DATA = "CLEAR_PROFILE_DATA";

export const ADD_TOKEN_TO_USER_STATE = "ADD_TOKEN_TO_USER_STATE";

export const profileDataRequest = () => {
  return {
    type: PROFILE_DATA_REQUEST,
  };
};

export const profileDataSuccess = (profileData) => {
  return {
    type: PROFILE_DATA_SUCCESS,
    payload: profileData,
  };
};

export const profileDataFailure = (error) => {
  return {
    type: PROFILE_DATA_FAILURE,
    payload: error,
  };
};

export const profileDataUpdate = () => {
  return {
    type: PROFILE_DATA_UPDATE,
  };
};

export const clearProfileData = () => {
  return {
    type: CLEAR_PROFILE_DATA,
  };
};

export const addTokenToUserState = (tokenObject) => {
  return {
    type: ADD_TOKEN_TO_USER_STATE,
    payload: tokenObject,
  };
};

export const profileInfoRequest = () => {
  return function (dispatch) {
    const accessToken = getAccessToken();

    const getUserProfileData = {
      method: "get",
      url: `${USER_URL}/user`,
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

export const profileInfoUpdate = (registerData) => {
  return function (dispatch) {
    const accessToken = getAccessToken();

    const data = JSON.stringify({
      name: registerData.name,
      email: registerData.email,
      password: "",
    });

    const updateInfo = {
      method: "patch",
      url: `${USER_URL}/user`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
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

export const tokenRefreshRequest = (refreshToken) => {
  return function (dispatch) {
    const data = JSON.stringify({
      token: refreshToken,
    });

    const config = {
      method: "post",
      url: `${USER_URL}/token`,
      headers: {
        "Content-Type": "application/json",
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

export const userExitRequest = (refreshToken) => {
  return function (dispatch) {
    const data = JSON.stringify({
      token: refreshToken,
    });

    const config = {
      method: "post",
      url: `${USER_URL}/logout`,

      headers: {
        "Content-Type": "application/json",
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
