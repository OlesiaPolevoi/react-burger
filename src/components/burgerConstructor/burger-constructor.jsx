import React, { useState } from "react";
import burgerConstructor from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../orderDetails/orderDetails";

export function BurgerConstructor({ data }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleModalClose = () => setModalIsOpen(false);

  return (
    <section className={burgerConstructor.section}>
      <div className={burgerConstructor.scroller}>
        {data.length !== 0 && <ConstructorIngredient dataArr={data} />}
      </div>

      <div className={burgerConstructor.total}>
        <div className={burgerConstructor.ammount}>
          <div className={burgerConstructor.price}>{610}</div>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          type="primary"
          size="medium"
          onClick={() => setModalIsOpen(true)}
        >
          Оформить заказ
        </Button>
      </div>

      {/* <button onClick={() => setModalIsOpen(true)}>Open Modal</button> */}
      <Modal modalIsOpen={modalIsOpen} onClose={handleModalClose}>
        <OrderDetails />
      </Modal>
    </section>
  );
}
function ConstructorIngredient({ dataArr }) {
  const outerBun = dataArr.find((el) => {
    return el.type === "bun";
  });

  const ingredientsArray = dataArr.filter((el) => {
    return el.type !== "bun";
  });

  return (
    <>
      <div
        className={burgerConstructor.container}
        className={burgerConstructor.margin}
      >
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${outerBun?.name ?? ""} (верх)`}
          price={outerBun?.price ?? 0}
          thumbnail={outerBun?.image}
        />
      </div>

      {ingredientsArray.map((el) => {
        return (
          <div key={el._id} className={burgerConstructor.container}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={el.name}
              price={el.price}
              thumbnail={el.image}
            />
          </div>
        );
      })}

      <div
        className={burgerConstructor.container}
        className={burgerConstructor.margin}
      >
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${outerBun?.name} (низ)`}
          price={outerBun?.price}
          thumbnail={outerBun?.image}
        />
      </div>
    </>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

ConstructorIngredient.propTypes = {
  dataArr: PropTypes.array.isRequired,
};
