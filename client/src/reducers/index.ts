import { combineReducers } from "redux";
import challengeReducer from "./challenge";

const rootReducer = combineReducers({ challenge: challengeReducer });

export default rootReducer;
