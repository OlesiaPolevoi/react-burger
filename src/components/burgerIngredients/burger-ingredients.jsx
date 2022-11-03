import React, { useState } from "react";
import {data} from "../../utils/data.js";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredients from './burger-ingredients.module.css';
import PropTypes from "prop-types";

export  function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");
  return (
    <main  >
      <h1 className={burgerIngredients.heading}>Соберите бургер</h1>

      <div  className={burgerIngredients.tab}>
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

    <section className={burgerIngredients.scroller}>
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
    </section>
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
      <section className={burgerIngredients.ingredient} onClick={handleClick}>
        <img src={`${image}`} alt={name}/>
        {count > 0 && <Counter count={count} size="default" />}
        <div className={burgerIngredients.price}>
          <div className={burgerIngredients.number}>{price}</div>
          <CurrencyIcon type="primary" />
        </div>
        <div className={burgerIngredients.description}>{name}</div>
      </section>
  
  );
}

IngredientsContainer.propTypes = {
  header: PropTypes.string.isRequired,
  cardsArr: PropTypes.array.isRequired
};

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};




