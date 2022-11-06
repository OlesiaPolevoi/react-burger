import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import axios from "axios";

import { AppHeader } from "../appHeader/app-header";
import { BurgerIngredients } from "../burgerIngredients/burger-ingredients";
import { BurgerConstructor } from "../burgerConstructor/burger-constructor";
import { Modal } from "../modal/modal";

function Test() {
  return <div>Hi Im test!!!</div>;
}

export function App() {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // initial state for modalIsOpen is false - change <button>onClick={()=>setModalIsOpen(true)}</button>
  const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

  const handleModalClose = () => setModalIsOpen(false);

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
    <>
      <div className={styles.app}>
        <AppHeader />

        <div className={styles.container}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </div>
        {/* NOTEremove this button later - make different elems change the state */}
        <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
      </div>
      <Modal modalIsOpen={modalIsOpen} onClose={handleModalClose}>
        <Test />
      </Modal>
    </>
  );
}
