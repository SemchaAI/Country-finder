import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "./store";

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,

  document.getElementById("root")
);
