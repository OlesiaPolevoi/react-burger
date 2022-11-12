import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
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
import { BASE_URL } from "../../utils/burger-api";
import axios from "axios";

export function BurgerConstructor() {
  const { data } = useContext(AppContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderNumber, setOrderNumber] = useState(null);

  const outerBun = useMemo(
    () =>
      data.find((el) => {
        return el.type === "bun";
      }),
    [data]
  );

  const ingredientsArray = useMemo(
    () =>
      data.filter((el) => {
        return el.type !== "bun";
      }),
    [data]
  );

  const handleOrder = (dataArray) => {
    const arrayOfIds = dataArray.map((el) => {
      return el._id;
    });

    const data = JSON.stringify({
      ingredients: arrayOfIds,
    });

    const getOrderNum = {
      method: "post",
      url: `${BASE_URL}/orders`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(getOrderNum)
      .then(function (response) {
        const order = JSON.parse(JSON.stringify(response.data));
        const orderNum = order.order.number;
        setOrderNumber(orderNum ?? []);
        setModalIsOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleModalClose = useCallback(() => setModalIsOpen(false), []);

  return (
    <section className={burgerConstructor.section}>
      {data.length !== 0 && (
        <ConstructorIngredient
          outerBun={outerBun}
          ingredientsArray={ingredientsArray}
          dataArr={data}
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
            handleOrder(data);
          }}
        >
          Оформить заказ
        </Button>
      </div>

      {modalIsOpen && (
        <Modal onClose={handleModalClose} title={null}>
          <OrderDetails orderNumber={orderNumber} />
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
