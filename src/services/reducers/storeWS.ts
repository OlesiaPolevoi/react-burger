import { createStore, Store } from "redux";
import * as io from "socket.io-client";
// import io from 'socket.io-client';

interface IStateWS {
  socket: io.Socket | null;
  data: any;
}

const initialState: IStateWS = {
  socket: null,
  data: {},
};

export function reducerWS(state = initialState, action: any) {
  switch (action.type) {
    case "CONNECT":
      return { ...state, socket: action.payload };
    case "DISCONNECT":
      return { ...state, socket: null };
    case "UPDATE_DATA":
      // console.log("HERE WE ARE!");
      // console.log(action.payload);

      return { ...state, data: action.payload };
    default:
      return state;
  }
}

// const store: Store = createStore(reducer);
// export default store;
