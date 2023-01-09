import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import currentOrders from "./current-orders.module.css";

export function CurrentOrders() {
  return (
    <div className={currentOrders.mainwrapper}>
      <h2 className={currentOrders.title}> Лента заказов </h2>
      <div className={currentOrders.wrapper}>
        <div className={currentOrders.container}>
          <Order />
          <Order />
          <Order />
          <Order />
        </div>
        <OrdersInfo />
      </div>
    </div>
  );
}

export function Order() {
  return (
    <div className={currentOrders.ordercontainer}>
      <div className={currentOrders.ordernumbercontainer}>
        <div className={currentOrders.ordernumber}>#123456</div>
        <div>Сегодня, 16:20 i-GMT+3</div>
      </div>

      <div className={currentOrders.burgertitle}>
        Death Star Starship Main бургер
      </div>
      <div className={currentOrders.imgpricecontainer}>
        <div>
          <img
            className={currentOrders.imgicon}
            src="https://code.s3.yandex.net/react/code/bun-02.png"
            alt="some description"
          />
          <img
            className={currentOrders.imgicon}
            src="https://code.s3.yandex.net/react/code/sauce-04.png"
            alt="some description"
          />
          <img
            className={currentOrders.imgicon}
            src="https://code.s3.yandex.net/react/code/meat-01.png"
            alt="some description"
          />
        </div>
        <div className={currentOrders.pricecontainer}>
          <div className={currentOrders.price}>123</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export function OrdersInfo() {
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
        <p className={currentOrders.fulfilledorder}>28 752</p>
      </div>
      <div>
        <h3 className={currentOrders.secondarytitle}>Выполнено за сегодня:</h3>
        <p className={currentOrders.fulfilledorder}>138</p>
      </div>
    </div>
  );
}
