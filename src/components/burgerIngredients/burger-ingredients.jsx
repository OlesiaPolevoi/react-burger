import React, { useState, useMemo, useEffect } from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredients from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useDrag } from "react-dnd";
import { getIngredientInfo } from "../../services/actions/ingredient-details.js";
import { Link, useLocation } from "react-router-dom";

const getVisibleTab = (bunsInView, saucesInView, mainsInView) => {
  if (bunsInView) return "buns";
  if (saucesInView) return "sauce";
  if (mainsInView) return "main";
};

export function BurgerIngredients() {
  const [currentTab, setCurrentTab] = React.useState("buns");
  const ingredients = useSelector((store) => store.ingredientsReducer);

  const bunsObj = useInView({ threshold: 0 });
  const bunsRef = bunsObj.ref;
  const bunsInView = bunsObj.inView;

  const saucesObj = useInView({ threshold: 0 });
  const saucesRef = saucesObj.ref;
  const saucesInView = saucesObj.inView;

  const mainsObj = useInView({ threshold: 0 });
  const mainsRef = mainsObj.ref;
  const mainsInView = mainsObj.inView;

  useEffect(() => {
    setCurrentTab(getVisibleTab(bunsInView, saucesInView, mainsInView));
  }, [bunsInView, saucesInView, mainsInView]);

  const bunsArray = useMemo(
    () => ingredients.items.filter((el) => el.type === "bun"),
    [ingredients.items]
  );

  const saucesArray = useMemo(
    () => ingredients.items.filter((el) => el.type === "sauce"),
    [ingredients.items]
  );

  const mainsArray = useMemo(
    () => ingredients.items.filter((el) => el.type === "main"),
    [ingredients.items]
  );

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section>
      <h1 className={burgerIngredients.heading}>Соберите бургер</h1>

      <div className={burgerIngredients.tab}>
        <Tab
          value="buns"
          active={currentTab === "buns"}
          onClick={() => {
            onTabClick("buns");
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={() => {
            onTabClick("sauce");
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={() => {
            onTabClick("main");
          }}
        >
          Начинки
        </Tab>
      </div>

      <section className={burgerIngredients.scroller}>
        <IngredientsContainer
          header="Булки"
          id="buns"
          cardsArr={bunsArray}
          myRef={bunsRef}
        />
        <IngredientsContainer
          header="Соусы"
          id="sauce"
          cardsArr={saucesArray}
          myRef={saucesRef}
        />
        <IngredientsContainer
          header="Начинки"
          id="main"
          cardsArr={mainsArray}
          myRef={mainsRef}
        />
      </section>
    </section>
  );
}

function IngredientsContainer({ header, cardsArr, id, myRef }) {
  const location = useLocation();

  return (
    <div ref={myRef}>
      <h2 className={burgerIngredients.header} id={id}>
        {header}
      </h2>
      <div className={burgerIngredients.container}>
        {cardsArr.map((el) => {
          return (
            <Link
              className={burgerIngredients.details}
              key={el._id}
              to={{
                pathname: `/ingredients/${el._id}`,
                state: { background: location },
              }}
            >
              <Ingredient el={el} key={el._id} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Ingredient({ el }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const openIngredientDetailModal = () => {
    dispatch(getIngredientInfo(el));
    setModalIsOpen(true);
  };

  const id = el["_id"];

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <>
      <section
        className={burgerIngredients.ingredient}
        onClick={openIngredientDetailModal}
        ref={dragRef}
      >
        <img src={`${el?.image}`} alt={el.name} />

        {"orderedQuantity" in el && el.orderedQuantity > 0 && (
          <Counter count={el.orderedQuantity} size="default" />
        )}

        <div className={burgerIngredients.price}>
          <div className={burgerIngredients.number}>{el.price}</div>
          <CurrencyIcon type="primary" />
        </div>
        <div className={burgerIngredients.description}>{el.name}</div>
      </section>
    </>
  );
}

IngredientsContainer.propTypes = {
  header: PropTypes.string.isRequired,

  cardsArr: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  id: PropTypes.string.isRequired,
};

Ingredient.propTypes = {
  el: ingredientType.isRequired,
};
