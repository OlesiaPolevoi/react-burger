import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import currentOrders from './current-orders.module.css';


export function CurrentOrders() {
  return (
    <div>
      <h2 className={currentOrders.title}> Лента заказов </h2>

      <div><Order/></div>
    </div>
  );
}




export default function Order() {
  return (
    <div>
      <div className={currentOrders.ordernumbercontainer}>

        <div className={currentOrders.ordernumber}>#123456</div>
        <div>Сегодня, 16:20 i-GMT+3</div>
      </div>

      <div className={currentOrders.burgertitle}>Death Star Starship Main бургер</div>
      <div>
      
        <img className={currentOrders.imgicon} src="https://code.s3.yandex.net/react/code/bun-02.png"alt="some description"/>
        <img className={currentOrders.imgicon} src = "https://code.s3.yandex.net/react/code/sauce-04.png" alt="some description"/>
        <img className={currentOrders.imgicon} src="https://code.s3.yandex.net/react/code/meat-01.png" alt="some description"/>
       
        <div className={currentOrders.pricecontainer}>
          <div>123</div>
          <CurrencyIcon type="primary" />
         </div> 
      
      </div>
    </div>
  )
}
