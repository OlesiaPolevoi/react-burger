import {
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAILURE,
  //CLEAR_USER_DATA,
} from "../actions/user-data";

import {
  PROFILE_DATA_REQUEST,
  PROFILE_DATA_UPDATE,
  PROFILE_DATA_SUCCESS,
  PROFILE_DATA_FAILURE,
} from "../actions/profile-data";

const userDataState = {
  email: "",
  name: "",
  accessToken: "",
  refreshToken: "",
  loading: false,
  error: "",
};

export const userDataReducer = (state = userDataState, action) => {
  switch (action.type) {
    case USER_DATA_REQUEST: {
      return { ...state, loading: true, error: "" };
    }
    case USER_DATA_SUCCESS: {
      return {
        ...state,
        name: action.payload.user.name,
        email: action.payload.user.email,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        loading: false,
        error: "",
      };
    }
    case USER_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case PROFILE_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case PROFILE_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    }
    //NOTE
    case PROFILE_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case PROFILE_DATA_UPDATE: {
      return {
        //NOTE ?
        ...state,
        loading: false,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    }
    // case CLEAR_USER_DATA: {
    //   return {
    //     email: "",
    //     name: "",
    //     accessToken: "",
    //     refreshToken: "",
    //     loading: false,
    //     error: "",
    //   };
    // }
    default: {
      return state;
    }
  }
};