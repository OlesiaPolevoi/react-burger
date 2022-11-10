import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import axios from "axios";

import { AppHeader } from "../appHeader/app-header";
import { BurgerIngredients } from "../burgerIngredients/burger-ingredients";
import { BurgerConstructor } from "../burgerConstructor/burger-constructor";
import { getIngredients } from "../../utils/burger-api";
export function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios(getIngredients)
      .then(function (response) {
        const data = JSON.parse(JSON.stringify(response?.data?.data));

        setData(data ?? []);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={styles.container}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}
