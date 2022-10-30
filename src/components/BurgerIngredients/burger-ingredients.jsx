import React, { useState } from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-ingredients.css";
import data from "/Users/olesiati/Desktop/react-burger/src/utils/data.js";
import PropTypes from "prop-types";

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");

  return (
    <main className="scroller">
      <h1 className="main-header">Соберите бургер</h1>

      <div style={{ display: "flex" }} className="main-tab">
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
      <h2 className="secondary-header">{header}</h2>

      <div className="burger-ingredients__container">
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
      <div className="ingredient" onClick={handleClick}>
        <img src={`${image}`} />
        {count > 0 && <Counter count={count} size="default" />}
        <div className="price">
          <div className="price-number">{price}</div>
          <CurrencyIcon type="primary" />
        </div>
        <div className="description">{name}</div>
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
