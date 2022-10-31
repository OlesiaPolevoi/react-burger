import React from "react";
import "./burger-constructor.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function BurgerConstructor() {
  return (
    <section>
      <div
        className="burger-constructor__scroller"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "40px",
        }}
      >
        <div
          className="burger-constructor-container"
          style={{ marginLeft: "32px" }}
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>

        <div className="burger-constructor-container">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i "
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>

        <div className="burger-constructor-container">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i "
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>
        <div className="burger-constructor-container">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i "
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>
        <div className="burger-constructor-container">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i "
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>
        <div className="burger-constructor-container">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i "
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>
        <div
          className="burger-constructor-container"
          style={{ marginLeft: "32px" }}
        >
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>
      </div>

      <div className="burger-constructor__total">
        <div className="price">
          <div className="burger-constructor__price-number price-number">
            {610}
          </div>
          <CurrencyIcon type="primary" />
        </div>

        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

Button.propTypes = {
  type: PropTypes.string,
};