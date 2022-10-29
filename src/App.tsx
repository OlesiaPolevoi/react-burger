import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import data from "/Users/olesiati/Desktop/react-burger/src/utils/data.js";

import AppHeader from "./components/AppHeader/app-header";
import BurgerIngredients from "./components/BurgerIngredients/burger-ingredients";

function App() {
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <AppHeader />
        <BurgerIngredients />
      </header>
    </div>
  );
}

export default App;
