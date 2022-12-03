import axios from "axios";
import { saveAccessToken, saveRefreshToken } from "../../utils/local-storage";

const USER_URL = "https://norma.nomoreparties.space/api/auth";

export const USER_DATA_REQUEST = "USER_DATA_REQUEST";
export const USER_DATA_SUCCESS = "USER_DATA_SUCCESS";
export const USER_DATA_FAILURE = "USER_DATA_FAILURE";
//export const CLEAR_USER_DATA = "CLEAR_USER_DATA";

export const userDataRequest = () => {
  return {
    type: USER_DATA_REQUEST,
  };
};

export const userDataSuccess = (userData) => {
  return {
    type: USER_DATA_SUCCESS,
    payload: userData,
  };
};

export const userDataFailure = (error) => {
  return {
    type: USER_DATA_FAILURE,
    payload: error,
  };
};
// export const clearUserData = () => {
//   return {
//     type: CLEAR_USER_DATA,
//   };
// };

export const userLoginRequest = (userDataArray, callback) => {
  return function (dispatch) {
    const data = JSON.stringify(userDataArray);
    const loginRequest = {
      method: "post",
      url: `${USER_URL}/login`,
      headers: {
        "Content-Type": "application/json",
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

export const userRegisterRequest = (userDataArray, callback) => {
  return function (dispatch) {
    const data = JSON.stringify(userDataArray);
    const registerRequest = {
      method: "post",
      url: `${USER_URL}/register`,
      headers: {
        "Content-Type": "application/json",
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

//POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.

export const userExitRequest = (refreshToken) => {
  return function (dispatch) {
    //var axios = require('axios');
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
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//NOTE TOKEN REFRESH
export const tokenRefreshRequest = (refreshToken) => {
  return function (dispatch) {
    // var axios = require('axios');
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
        //console.log(JSON.stringify(response.data));
        const userData = response.data;
        saveAccessToken(userData.accessToken);
        ///NOTE SAVE TO REDUX TOO
        // saveRefreshToken(userData.refreshToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
