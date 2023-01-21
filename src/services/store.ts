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

// import { applyMiddleware, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import { rootReducer } from './reducers';
// import { compose } from 'redux';

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));

// export const store = createStore(rootReducer, enhancer);
