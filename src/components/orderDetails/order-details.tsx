import orderDetails from "./order-details.module.css";
import checkIcon from "../../images/check.png";
import { useSelector } from "react-redux";
import { TCombinedReducer } from "../../types";

export function OrderDetails() {
  const orderNumberObj = useSelector(
    (store: TCombinedReducer) => store.orderDetailsReducer
  );

  return (
    <div className={orderDetails.container}>
      <h3 className={orderDetails.info}>order number</h3>
      <h2 className={orderDetails.number}>{orderNumberObj.orderNumber}</h2>
      <img src={checkIcon} alt="checkmark icon" className={orderDetails.img} />
      <div className={orderDetails.message}>Your order is in progress</div>
      <div className={orderDetails.wait}>
        Please wait for your order at the orbital station{" "}
      </div>
    </div>
  );
}
