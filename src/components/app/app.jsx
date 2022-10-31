import React from "react";
import "./app.css";

import AppHeader from "../AppHeader/app-header";
import BurgerIngredients from "../BurgerIngredients/burger-ingredients";
import BurgerConstructor from "../../components/BurgerConstructor/burger-constructor";

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
