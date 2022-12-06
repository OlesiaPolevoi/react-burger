import {
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAILURE,
} from "../actions/user-data";

import {
  PROFILE_DATA_REQUEST,
  CLEAR_PROFILE_DATA,
  PROFILE_DATA_UPDATE,
  PROFILE_DATA_SUCCESS,
  PROFILE_DATA_FAILURE,
  ADD_TOKEN_TO_USER_STATE,
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

    case PROFILE_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case PROFILE_DATA_UPDATE: {
      return {
        ...state,
        loading: false,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    }
    case ADD_TOKEN_TO_USER_STATE: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case CLEAR_PROFILE_DATA: {
      return {
        email: "",
        name: "",
        accessToken: "",
        refreshToken: "",
        loading: false,
        error: "",
      };
    }

    default: {
      return state;
    }
  }
};
