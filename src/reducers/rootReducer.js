import { combineReducers } from "redux";
import { loginReducer } from "./login/loginReducer";

export const rootReducer = combineReducers({
    credentials: loginReducer
})