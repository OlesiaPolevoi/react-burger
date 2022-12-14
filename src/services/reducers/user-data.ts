import {
  UserDataActions,
  ProfileDataActions,
  TUserDataState,
  TUserDataReducerAction,
  TUserData,
  TUserSuccess,
  TUserToken,
} from '../../types/index';

const userDataState = {
  email: '',
  name: '',
  accessToken: '',
  refreshToken: '',
  loading: false,
  error: '',
};

export const userDataReducer = (
  state: TUserDataState = userDataState,
  action: TUserDataReducerAction
) => {
  switch (action.type) {
    case UserDataActions.USER_DATA_REQUEST: {
      return { ...state, loading: true, error: '' };
    }
    case UserDataActions.USER_DATA_SUCCESS: {
      const overwritePayload = action.payload as TUserData;

      return {
        ...state,
        name: overwritePayload.user.name,
        email: overwritePayload.user.email,
        accessToken: overwritePayload.accessToken,
        refreshToken: overwritePayload.refreshToken,
        loading: false,
        error: '',
      };
    }
    case UserDataActions.USER_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case ProfileDataActions.PROFILE_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case ProfileDataActions.PROFILE_DATA_SUCCESS: {
      const overwritePayload = action.payload as TUserSuccess;

      return {
        ...state,
        loading: false,
        name: overwritePayload.user.name,
        email: overwritePayload.user.email,
      };
    }

    case ProfileDataActions.PROFILE_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case ProfileDataActions.PROFILE_DATA_UPDATE: {
      const overwritePayload = action.payload as TUserSuccess;

      return {
        ...state,
        loading: false,
        name: overwritePayload.user.name,
        email: overwritePayload.user.email,
      };
    }
    case ProfileDataActions.ADD_TOKEN_TO_USER_STATE: {
      const overwritePayload = action.payload as TUserToken;

      return {
        ...state,
        accessToken: overwritePayload.accessToken,
        refreshToken: overwritePayload.refreshToken,
      };
    }
    case ProfileDataActions.CLEAR_PROFILE_DATA: {
      return {
        email: '',
        name: '',
        accessToken: '',
        refreshToken: '',
        loading: false,
        error: '',
      };
    }

    default: {
      return state;
    }
  }
};
