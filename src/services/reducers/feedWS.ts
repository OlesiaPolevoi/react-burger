import {
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_CLOSED,
  FEED_GET_MESSAGE,
} from "../actions/feedWS";

export const initialState = {
  data: {},
  isOpen: false,
  error: null,
};

export function reducerWS(state = initialState, action: any) {
  switch (action.type) {
    case FEED_CONNECTION_SUCCESS:
      return { ...state, isOpen: true, error: null };
    case FEED_CONNECTION_ERROR:
      return { ...state, error: action.payload };
    case FEED_CONNECTION_CLOSED:
      return { ...state, isOpen: false };
    case FEED_GET_MESSAGE:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}
