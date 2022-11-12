import React from "react";
import orderDetails from "./order-details.module.css";
import checkIcon from "../../images/check.png";
import PropTypes from "prop-types";

export function OrderDetails({ orderNumber }) {
  return (
    <div className={orderDetails.container}>
      <h2 className={orderDetails.number}>{orderNumber}</h2>
      <h3 className={orderDetails.info}>идентификатор заказа</h3>
      <img src={checkIcon} alt="checkmark icon" className={orderDetails.img} />
      <div className={orderDetails.message}>Ваш заказ начали готовить</div>
      <div className={orderDetails.wait}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};
