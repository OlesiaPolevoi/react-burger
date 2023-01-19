// import * as io from "socket.io-client";

interface IStateWS {
  // socket: io.Socket | null;
  data: any;
}

const profileInitialState: IStateWS = {
  // socket: null,
  data: {},
};

export function profileReducerWS(state = profileInitialState, action: any) {
  switch (action.type) {
    case "CONNECT":
      return { ...state };
    case "DISCONNECT":
      return { ...state };
    case "UPDATE_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
