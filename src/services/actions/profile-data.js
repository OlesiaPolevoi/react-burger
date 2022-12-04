import axios from "axios";
import { getAccessToken } from "../../utils/local-storage";

const USER_URL = "https://norma.nomoreparties.space/api/auth";

export const PROFILE_DATA_REQUEST = "PROFILE_DATA_REQUEST";
export const PROFILE_DATA_SUCCESS = "PROFILE_DATA_SUCCESS";
export const PROFILE_DATA_FAILURE = "PROFILE_DATA_FAILURE";
export const PROFILE_DATA_UPDATE = "PROFILE_DATA_UPDATE";

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
