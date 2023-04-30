import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { myReducer } from "./reducer";
import logger from "redux-logger";

export const myStore = createStore(myReducer, applyMiddleware(thunk, logger));


