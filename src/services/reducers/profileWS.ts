import {
  PROFILE_CONNECTION_SUCCESS,
  PROFILE_CONNECTION_ERROR,
  PROFILE_CONNECTION_CLOSED,
  PROFILE_GET_MESSAGE,
} from "../actions/profileWS";

export const profileInitialState = {
  data: {},
  isOpen: false,
  error: null,
};

export function profileReducerWS(state = profileInitialState, action: any) {
  switch (action.type) {
    case PROFILE_CONNECTION_SUCCESS:
      return { ...state, isOpen: true, error: null };
    case PROFILE_CONNECTION_ERROR:
      return { ...state, error: action.payload };
    case PROFILE_CONNECTION_CLOSED:
      return { ...state, isOpen: false };
    case PROFILE_GET_MESSAGE:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}
