import orderDetails from './order-details.module.css';
import checkIcon from '../../images/check.png';
import { useSelector } from 'react-redux';
import { TCombinedReducer } from '../../types';

export function OrderDetails() {
  const orderNumberObj = useSelector(
    (store: TCombinedReducer) => store.orderDetailsReducer
  );

  return (
    <div className={orderDetails.container}>
      <h2 className={orderDetails.number}>{orderNumberObj.orderNumber}</h2>
      <h3 className={orderDetails.info}>идентификатор заказа</h3>
      <img src={checkIcon} alt='checkmark icon' className={orderDetails.img} />
      <div className={orderDetails.message}>Ваш заказ начали готовить</div>
      <div className={orderDetails.wait}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
}
