import { combineReducers } from "redux";
import auth from "../reducers/auth.reducer";
import cases from "../reducers/case.reducer";

export default combineReducers({
  auth,
  cases
});
