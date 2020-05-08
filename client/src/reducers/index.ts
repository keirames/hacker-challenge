import { combineReducers } from "redux";
import challengeReducer from "./challenge";

const rootReducer = combineReducers({ challengeReducer });

export default rootReducer;
