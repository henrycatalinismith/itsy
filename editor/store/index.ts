import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";

import logger from "redux-logger";
import { ThunkAction } from "redux-thunk";

import text from "./text";
import webview from "./webview";

const postMessageMiddleware = store => next => action => {
  next(action);

  if (!(window as any).isReactNative || action.__postMessage) {
    return;
  }

  const message = JSON.stringify(action);
  window.postMessage(message, "*");

  if (action.type === "webview/start") {
    document.addEventListener("message", (data: any) => {
      const action = JSON.parse(data.data);
      action.__postMessage = true;
      store.dispatch(action);
    });
  }
};

const middleware = [...getDefaultMiddleware(), logger, postMessageMiddleware];

const reducer = combineReducers({
  text: text.reducer,
  webview: webview.reducer
});

const preloadedState = {};

const store = configureStore({
  reducer,
  middleware,
  preloadedState
});

export type RootState = ReturnType<typeof reducer>;
export type Dispatch = typeof store.dispatch;
export type Thunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
