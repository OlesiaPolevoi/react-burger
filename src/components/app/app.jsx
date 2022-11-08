import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import axios from "axios";

import { AppHeader } from "../appHeader/app-header";
import { BurgerIngredients } from "../burgerIngredients/burger-ingredients";
import { BurgerConstructor } from "../burgerConstructor/burger-constructor";

export function App() {
  const [data, setData] = useState([]);

  const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    const config = {
      method: "get",
      url: apiUrl,
      headers: {},
    };

    axios(config)
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
