import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./components/app/app.jsx";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./services/store";
import "@ya.praktikum/react-developer-burger-ui-components";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
