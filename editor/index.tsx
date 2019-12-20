import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/lua/lua";
import Editor from "./components/editor/editor.component";

import store from "@itsy.studio/editor/store";
import { startWebview } from "@itsy.studio/editor/store/webview";

const root = document.createElement("div");
document.body.appendChild(root);
document.body.style.margin = "0";

const editor = (
  <Provider store={store}>
    <Editor />
  </Provider>
);

document.addEventListener("DOMContentLoaded", () => {
  store.dispatch(startWebview());
});

ReactDOM.render(editor, root);
