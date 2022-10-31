import React from "react";
import burgerConstructor from './burger-constructor.module.css';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function BurgerConstructor() {
  return (
    <section className={burgerConstructor.section}>
      <div
        className={burgerConstructor.scroller}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "40px",
        }}
      >
        <div
          className={burgerConstructor.container}
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

        <div className={burgerConstructor.container}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i "
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>

        <div className={burgerConstructor.container}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i "
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>
        <div className={burgerConstructor.container}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i "
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>
        <div className={burgerConstructor.container}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i "
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>
        <div className={burgerConstructor.container}>
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
          className={burgerConstructor.container}
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

      <div className={burgerConstructor.total}>
        <div className="price">
          <div className={burgerConstructor.price}>
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