import { combineReducers } from "redux";
import { ingredientsReducer } from "./fetch-ingredients";
import { orderDetailsReducer } from "./submit-order";
import { constructorReducer } from "./burger-constructor";
import { ingredientDetailsReducer } from "./ingredient-details";
import { userDataReducer } from "./user-data";
import { reducerWS } from "./storeWS";

export default combineReducers({
  orderDetailsReducer,
  ingredientsReducer,
  constructorReducer,
  ingredientDetailsReducer,
  userDataReducer,
  reducerWS,
});
