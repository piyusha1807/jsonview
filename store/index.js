import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./reducers";

const middleWares = [logger, thunk, promiseMiddleware];

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo") || "{}")
//   : null;

const initialState = {
  userLogin: {
    userInfo: null,
  },
  settings: {},
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export default store;
