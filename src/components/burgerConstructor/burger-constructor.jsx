import React from "react";
import burgerConstructor from './burger-constructor.module.css';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {data} from "../../utils/data.js";
import PropTypes from "prop-types";

export function BurgerConstructor() {
  return (
    <section className={burgerConstructor.section}>
      <div
        className={burgerConstructor.scroller}
      >
        <ConstructorIngredient dataArr={data}/>
      </div>

      <div className={burgerConstructor.total}>
        <div className={burgerConstructor.ammount}>
          <div className={burgerConstructor.price}>
            {610}
          </div>
          <CurrencyIcon type="primary" />
        </div>

        <Button type="primary" size="medium" >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
function ConstructorIngredient({dataArr}) {
  return (dataArr.map((el, index)=>{
    return (
      <div key={el._id} className={`${burgerConstructor.container} ${index === 0 || 
        index ===dataArr.length -1 ? burgerConstructor.margin : ""}`}  
      >
        {
          index !== 0 && index !== dataArr.length -1 && <DragIcon type="primary" />
        }
        <ConstructorElement 
          type={index === 0 ? "top" : index === dataArr.length - 1 ? "bottom" : undefined} 
          isLocked={index === 0 || index === dataArr.length - 1}    
          text={el.name}
          price={el.price}
          thumbnail={el.image}
        />
      </div>
    ) 
  }
))}  


Button.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
};

ConstructorIngredient.propTypes = {
  dataArr: PropTypes.array.isRequired
};



