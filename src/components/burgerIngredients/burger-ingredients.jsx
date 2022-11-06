import React, { useState } from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredients from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredientDetails/ingredient-details";

export function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState("one");

  return (
    <main>
      <h1 className={burgerIngredients.heading}>Соберите бургер</h1>

      <div className={burgerIngredients.tab}>
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
              calories={el.calories}
              carbohydrates={el.carbohydrates}
              fat={el.fat}
              proteins={el.proteins}
            />
          );
        })}
      </div>
    </>
  );
}

function Ingredient({
  name,
  price,
  image,
  calories,
  carbohydrates,
  fat,
  proteins,
}) {
  const [count, setCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalClose = () => setModalIsOpen(false);

  return (
    <>
      <section
        className={burgerIngredients.ingredient}
        onClick={() => setModalIsOpen(true)}
      >
        <img src={`${image}`} alt={name} />
        {count > 0 && <Counter count={count} size="default" />}
        <div className={burgerIngredients.price}>
          <div className={burgerIngredients.number}>{price}</div>
          <CurrencyIcon type="primary" />
        </div>
        <div className={burgerIngredients.description}>{name}</div>
      </section>

      <Modal
        modalIsOpen={modalIsOpen}
        onClose={handleModalClose}
        title="Детали ингредиента"
      >
        <IngredientDetails
          name={name}
          image={image}
          calories={calories}
          carbohydrates={carbohydrates}
          fat={fat}
          proteins={proteins}
        />
      </Modal>
    </>
  );
}
BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
};

IngredientsContainer.propTypes = {
  header: PropTypes.string.isRequired,
  cardsArr: PropTypes.array.isRequired,
};

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
};
