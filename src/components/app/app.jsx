import React from "react";
import styles from './app.module.css';


import {AppHeader} from "../appHeader/app-header";
import {BurgerIngredients} from "../burgerIngredients/burger-ingredients";
import {BurgerConstructor} from "../burgerConstructor/burger-constructor";

export function App() {
  return (
    <div className={styles.app}>
      <AppHeader />

      <div className={styles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  );
}



