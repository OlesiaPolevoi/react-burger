import React from "react";
import orderDetails from "./order-details.module.css";
import check from "../../images/check.png";

export function OrderDetails() {
  return (
    <div className={orderDetails.container}>
      <h2 className={orderDetails.number}>034536</h2>
      <h3 className={orderDetails.info}>идентификатор заказа</h3>
      <img src={check} alt="checkmark icon" className={orderDetails.img} />
      <div className={orderDetails.message}>Ваш заказ начали готовить</div>
      <div className={orderDetails.wait}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
}
