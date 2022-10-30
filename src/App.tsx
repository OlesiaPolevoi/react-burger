import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import data from "/Users/olesiati/Desktop/react-burger/src/utils/data.js";

import AppHeader from "./components/AppHeader/app-header";
import BurgerIngredients from "./components/BurgerIngredients/burger-ingredients";
import BurgerConstructor from "./components/BurgerConstructor/burger-constructor";

function App() {
  return (
    <div className="app">
      <AppHeader />

      <div className="app-container">
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  );
}

export default App;
