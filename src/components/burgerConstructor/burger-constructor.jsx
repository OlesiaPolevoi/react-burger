import React, { useState, useCallback, useContext } from "react";
import burgerConstructor from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../orderDetails/order-details";
import { AppContext } from "../../utils/appContext";

export function BurgerConstructor() {
  const { data } = useContext(AppContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalClose = useCallback(() => setModalIsOpen(false), []);

  return (
    <section className={burgerConstructor.section}>
      {data.length !== 0 && <ConstructorIngredient dataArr={data} />}

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

      {modalIsOpen && (
        <Modal onClose={handleModalClose} title={null}>
          <OrderDetails />
        </Modal>
      )}
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
      <div className={burgerConstructor.margin}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${outerBun?.name ?? ""} (верх)`}
          price={outerBun?.price ?? 0}
          thumbnail={outerBun?.image}
        />
      </div>

      <div className={burgerConstructor.scroller}>
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
      </div>

      <div className={burgerConstructor.margin}>
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

BurgerConstructor.propTypes = {
  dataArr: PropTypes.array,
};
