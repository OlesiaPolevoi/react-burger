import React, { useState, useCallback, useContext, useMemo } from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredients from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredientDetails/ingredient-details";
import { ingredientType } from "../../utils/types";
import { AppContext } from "../../utils/appContext";

export function BurgerIngredients() {
  const { data } = useContext(AppContext);
  const [current, setCurrent] = React.useState("buns");

  const bunsArray = useMemo(
    () => data.filter((el) => el.type === "bun"),
    [data]
  );

  const saucesArray = useMemo(
    () => data.filter((el) => el.type === "sauce"),
    [data]
  );

  const mainsArray = useMemo(
    () => data.filter((el) => el.type === "main"),
    [data]
  );

  const onTabClick = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section>
      <h1 className={burgerIngredients.heading}>Соберите бургер</h1>

      <div className={burgerIngredients.tab}>
        <Tab
          value="buns"
          active={current === "buns"}
          onClick={() => {
            onTabClick("buns");
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => {
            onTabClick("sauce");
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => {
            onTabClick("main");
          }}
        >
          Начинки
        </Tab>
      </div>

      <section className={burgerIngredients.scroller}>
        <IngredientsContainer header="Булки" id="buns" cardsArr={bunsArray} />
        <IngredientsContainer
          header="Соусы"
          id="sauce"
          cardsArr={saucesArray}
        />
        <IngredientsContainer
          header="Начинки"
          id="main"
          cardsArr={mainsArray}
        />
      </section>
    </section>
  );
}

function IngredientsContainer({ header, cardsArr, id }) {
  return (
    <>
      <h2 className={burgerIngredients.header} id={id}>
        {header}
      </h2>
      <div className={burgerIngredients.container}>
        {cardsArr.map((el) => {
          return <Ingredient el={el} key={el._id} />;
        })}
      </div>
    </>
  );
}

function Ingredient({ el }) {
  const [count, setCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalClose = useCallback(() => setModalIsOpen(false), []);

  return (
    <>
      <section
        className={burgerIngredients.ingredient}
        onClick={() => setModalIsOpen(true)}
      >
        <img src={`${el.image}`} alt={el.name} />
        {el.count > 0 && <Counter count={el.count} size="default" />}
        <div className={burgerIngredients.price}>
          <div className={burgerIngredients.number}>{el.price}</div>
          <CurrencyIcon type="primary" />
        </div>
        <div className={burgerIngredients.description}>{el.name}</div>
      </section>

      {modalIsOpen && (
        <Modal onClose={handleModalClose} title="Детали ингредиента">
          <IngredientDetails el={el} />
        </Modal>
      )}
    </>
  );
}

IngredientsContainer.propTypes = {
  header: PropTypes.string.isRequired,
  cardsArr: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

Ingredient.propTypes = {
  el: ingredientType,
};
