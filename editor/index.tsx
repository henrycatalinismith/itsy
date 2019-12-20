import React from "react";
import ReactDOM from "react-dom";
import { createLogger } from "redux-logger";
import { combineReducers, applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";

import { reducer, after, before, replace } from "@highvalley.systems/signalbox";

import "codemirror/lib/codemirror.css";
import "codemirror/mode/lua/lua";

import actions from "./actions";
import Editor from "./components/editor/editor.component";

const reducers = combineReducers({
  loading: reducer(true, {
    ready: (store, action) => action.loading,
    inject: (store, action) => false
  }),

  lua: reducer("", {
    change: (store, action) => action.lua,
    inject: (store, action) => action.lua
  })
});

const initialState = {
  loading: true,
  lua: ""
};

const middlewares = applyMiddleware.apply(null, [
  createLogger({ collapsed: true }),

  // dispatch all incoming postMessages as store actions
  after("impression", store => {
    document.addEventListener("message", (data: any) => {
      const action = JSON.parse(data.data);
      action.__postMessage = true;
      store.dispatch(action);
    });
  }),

  // report all store actions via postMessage
  after(/.*/, (store, action) => {
    // except the ones that came in via postMessage
    if (!(window as any).isReactNative || action.__postMessage) {
      return;
    }
    const message = JSON.stringify(action);
    window.postMessage(message, "*");
  }),

  // wait a bit before reporting readiness because of this
  // https://github.com/facebook/react-native/issues/11594
  after("impression", store => {
    setTimeout(() => {
      store.dispatch(actions.ready(!!(window as any).isReactNative));
    }, 300);
  })
]);

const store = createStore(reducers, initialState, middlewares);

const root = document.createElement("div");
document.body.appendChild(root);
document.body.style.margin = "0";

const editor = (
  <Provider store={store}>
    <Editor />
  </Provider>
);

document.addEventListener("DOMContentLoaded", () => {
  store.dispatch(actions.impression());
});

ReactDOM.render(editor, root);
