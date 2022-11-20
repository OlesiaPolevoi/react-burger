import { useState, useEffect, useCallback, useMemo } from "react";
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

import { useSelector, useDispatch } from "react-redux";
import { clearOrderNumber } from "../../services/actions/index.js";
import { makeOrderAndGetRequestId } from "../../services/actions";

export function BurgerConstructor() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const ingredients = useSelector((store) => store.ingredientsReducer);
  const dispatch = useDispatch();

  const outerBun = useMemo(
    () =>
      ingredients.items.find((el) => {
        return el.type === "bun";
      }),
    [ingredients.items]
  );

  const ingredientsArray = useMemo(
    () =>
      ingredients.items.filter((el) => {
        return el.type !== "bun";
      }),
    [ingredients.items]
  );

  const handleOrder = (dataArray) => {
    dispatch(makeOrderAndGetRequestId(dataArray, () => setModalIsOpen(true)));
  };

  const handleModalClose = useCallback(() => {
    setModalIsOpen(false);
    dispatch(clearOrderNumber());
  }, []);

  return (
    <section className={burgerConstructor.section}>
      {ingredients.items.length !== 0 && (
        <ConstructorIngredient
          outerBun={outerBun}
          ingredientsArray={ingredientsArray}
          dataArr={ingredients.items}
          setTotalPrice={setTotalPrice}
        />
      )}

      <div className={burgerConstructor.total}>
        <div className={burgerConstructor.ammount}>
          <div className={burgerConstructor.price}>{totalPrice}</div>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="medium"
          onClick={() => {
            handleOrder(ingredients.items);
          }}
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

function ConstructorIngredient({ ingredientsArray, outerBun, setTotalPrice }) {
  useEffect(() => {
    const sum = ingredientsArray.reduce((prev, current) => {
      return prev + current.price;
    }, 0);
    const totalPrice = sum + outerBun.price * 2;
    setTotalPrice(totalPrice);
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
  ingredientsArray: PropTypes.array.isRequired,
  outerBun: PropTypes.object.isRequired,
  setTotalPrice: PropTypes.func,
};
