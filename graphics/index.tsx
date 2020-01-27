import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Graphics from "@itsy.studio/graphics/components/graphics";
import store from "@itsy.studio/graphics/store";
import { startWebview } from "@itsy.studio/graphics/store/webview";

const root = document.createElement("div");
document.body.appendChild(root);
document.body.style.margin = "0";

const graphics = (
  <Provider store={store}>
    <Graphics />
  </Provider>
);

document.addEventListener("DOMContentLoaded", () => {
  store.dispatch<any>(startWebview());
});

ReactDOM.render(graphics, root);
