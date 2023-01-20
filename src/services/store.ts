import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers";
import { socketMiddleware } from "./middleware/socket-middleware";

import { composeWithDevTools } from "@redux-devtools/extension";
import { feedWsActions } from "./actions/feedWS";
import { profileWsActions } from "./actions/profileWS";

export const store = createStore(
  combineReducers,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(feedWsActions),
      socketMiddleware(profileWsActions)
    )
  )
);
