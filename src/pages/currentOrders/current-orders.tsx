import React, { useEffect } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import currentOrders from "./current-orders.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TCombinedReducer } from "../../types";
import { useDispatch } from "react-redux";

export const ordersData: any = {
  orders: [
    {
      _id: "63bf2d1008634b001c9b6674",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Space spicy флюоресцентный антарианский бургер",
      createdAt: "2023-01-11T21:41:36.099Z",
      updatedAt: "2023-01-11T21:41:36.506Z",
      number: 36805,
    },
    {
      _id: "63bf2c2608634b001c9b6670",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Фалленианский флюоресцентный минеральный астероидный space био-марсианский бургер",
      createdAt: "2023-01-11T21:37:42.788Z",
      updatedAt: "2023-01-11T21:37:43.215Z",
      number: 36804,
    },
    {
      _id: "63bf26a908634b001c9b665b",
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733c6",
      ],
      status: "done",
      name: "Spicy краторный бургер",
      createdAt: "2023-01-11T21:14:17.463Z",
      updatedAt: "2023-01-11T21:14:17.941Z",
      number: 36803,
    },
    {
      _id: "63bf20fa08634b001c9b662f",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Space флюоресцентный бургер",
      createdAt: "2023-01-11T20:50:02.820Z",
      updatedAt: "2023-01-11T20:50:03.249Z",
      number: 36802,
    },
  ],
  total: 36716,
  totalToday: 57,
};

export function CurrentOrders() {
  const socketUrl = "wss://norma.nomoreparties.space/orders/all";
  const dispatch = useDispatch();
  const ordersData1 = useSelector((store: any) => store.reducerWS);
  const arr = ordersData1?.data?.orders ? ordersData1?.data?.orders : [];

  useEffect(() => {
    const socket = new WebSocket(socketUrl);

    socket.onopen = (event) => {
      dispatch({ type: "CONNECT", payload: socket });
      // console.log("Connect");
    };

    socket.onmessage = function (event) {
      // console.log("event", event);

      const json = JSON.parse(event.data);
      dispatch({ type: "UPDATE_DATA", payload: json });
      // console.log("Update");
    };

    return () => {
      if (socket.readyState === 1) {
        dispatch({ type: "DISCONNECT" });
        socket.close();
        // console.log("DisConnect");
      }
    };
  }, [socketUrl, dispatch]);

  return (
    <div className={currentOrders.mainwrapper}>
      <h2 className={currentOrders.title}> Лента заказов </h2>
      <div className={currentOrders.wrapper}>
        <div className={currentOrders.container}>
          {arr.map((order: any) => {
            return (
              <Link
                className={currentOrders.details}
                key={order._id}
                to={{
                  pathname: `/feed/${order._id}`,
                }}
              >
                {/* @ts-ignore */}
                <Order order={order} key={order._id} id={order._id} />
              </Link>
            );
          })}
        </div>
        <OrdersInfo />
      </div>
    </div>
  );
}

// @ts-ignore
export function Order({ order }) {
  const ingredientsStore = useSelector(
    (store: TCombinedReducer) => store.ingredientsReducer
  );
  const ingredientsArray = ingredientsStore.items;
  let orderArray = ingredientsArray.filter((el) => {
    return order.ingredients.includes(el._id);
  });

  const remainingIngredients = orderArray.length - 5;

  if (orderArray.length > 5) {
    orderArray = orderArray?.slice(0, 5);
  }

  const calculateSum = () => {
    let sum = 0;
    if (orderArray.length > 0) {
      sum = orderArray.reduce((a, b) => {
        return a + b.price;
      }, 0);
    }
    const bun = orderArray.find((el) => {
      return el.type === "bun";
    });
    const bunPrice = bun?.price ?? 0;
    return bunPrice + sum;
  };

  const burgerTitle = order.name.split(" ").slice(0, 6).join(" ");

  const formatDate = (dateFromServer: string) => {
    return <FormattedDate date={new Date(dateFromServer)} />;
  };

  return (
    <div className={currentOrders.ordercontainer}>
      <div className={currentOrders.ordernumbercontainer}>
        <div className={currentOrders.ordernumber}>#{order.number}</div>
        <div className={currentOrders.date}>{formatDate(order.createdAt)}</div>
      </div>

      <div className={currentOrders.burgertitle}>{burgerTitle}</div>
      <div className={currentOrders.imgpricecontainer}>
        <div className={currentOrders.imgswrapper}>
          {orderArray.map((el, i) => {
            return (
              <img
                className={currentOrders.imgicon}
                src={el.image}
                alt={el.name}
                key={i}
              />
            );
          })}
          {remainingIngredients > 0 && (
            <div>{` + ${remainingIngredients}`}</div>
          )}
        </div>
        <div className={currentOrders.pricecontainer}>
          <div className={currentOrders.price}>{calculateSum()}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export function OrdersInfo() {
  const ordersData1 = useSelector((store: any) => store.reducerWS);

  const arr = ordersData1?.data ? ordersData1?.data : null;

  return (
    <div className={currentOrders.ordersinfo}>
      <div className={currentOrders.ordersinfocontainer}>
        <div>
          <h3 className={currentOrders.secondarytitle}>Готовы:</h3>
          <ul>
            <li className={currentOrders.readyorders}>034533</li>
            <li className={currentOrders.readyorders}>034532</li>
            <li className={currentOrders.readyorders}>034532</li>
            <li className={currentOrders.readyorders}>034532</li>
            <li className={currentOrders.readyorders}>034525</li>
          </ul>
        </div>
        <div>
          <h3 className={currentOrders.secondarytitle}>В работе:</h3>
          <ul>
            <li className={currentOrders.workingorders}>034541</li>
            <li className={currentOrders.workingorders}>034542</li>
            <li className={currentOrders.workingorders}>034632</li>
          </ul>
        </div>
      </div>
      <div>
        <h3 className={currentOrders.secondarytitle}>
          Выполнено за все время:
        </h3>
        <p className={currentOrders.fulfilledorder}>{arr?.total}</p>
      </div>
      <div>
        <h3 className={currentOrders.secondarytitle}>Выполнено за сегодня:</h3>
        <p className={currentOrders.fulfilledorder}>{arr?.totalToday}</p>
      </div>
    </div>
  );
}
