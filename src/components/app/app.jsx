import { useEffect } from "react";
import styles from "./app.module.css";

import { AppHeader } from "../appHeader/app-header";
import { BurgerIngredients } from "../burgerIngredients/burger-ingredients";
import { BurgerConstructor } from "../burgerConstructor/burger-constructor";

import { useDispatch } from "react-redux";
import { getIngredientsFunc } from "../../services/actions";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsFunc());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}
