import React, { useState } from "react";
import data from "../../utils/data.js";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import "./burger-ingredients.css";
import burgerIngredients from './burger-ingredients.module.css';
import PropTypes from "prop-types";



export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");
  return (
    <main className={burgerIngredients.scroller} >
      <h1 className={burgerIngredients.heading}>Соберите бургер</h1>

      <div style={{ display: "flex" }} className={burgerIngredients.tab}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <IngredientsContainer
        header="Булки"
        cardsArr={data.filter((el) => {
          return el.type === "bun";
        })}
      />

      <IngredientsContainer
        header="Соусы"
        cardsArr={data.filter((el) => {
          return el.type === "sauce";
        })}
      />
      <IngredientsContainer
        header="Начинки"
        cardsArr={data.filter((el) => {
          return el.type === "main";
        })}
      />
    </main>
  );
}

function IngredientsContainer({ header, cardsArr }) {
  return (
    <>
      <h2 className={burgerIngredients.header}>{header}</h2>

      <div className={burgerIngredients.container}>
        {cardsArr.map((el) => {
          return (
            <Ingredient
              name={el.name}
              price={el.price}
              image={el.image}
              key={el._id}
            />
          );
        })}
      </div>
    </>
  );
}

function Ingredient({ name, price, image }) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => {
      return (prev += 1);
    });
  };
  return (
    <>
      <div className={burgerIngredients.ingredient} onClick={handleClick}>
        <img src={`${image}`} />
        {count > 0 && <Counter count={count} size="default" />}
        <div className={burgerIngredients.price}>
          <div className={burgerIngredients.number}>{price}</div>
          <CurrencyIcon type="primary" />
        </div>
        <div className={burgerIngredients.description}>{name}</div>
      </div>
    </>
  );
}

IngredientsContainer.propTypes = {
  header: PropTypes.string,
  cardsArr: PropTypes.array,
};

Ingredient.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
};

Tab.propTypes = {
  value: PropTypes.string,
  active: PropTypes.bool,
};