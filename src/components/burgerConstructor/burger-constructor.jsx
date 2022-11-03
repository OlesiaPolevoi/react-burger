import React from "react";
import burgerConstructor from './burger-constructor.module.css';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data.js";
import PropTypes from "prop-types";

export default function BurgerConstructor() {
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
return(<>
{index === 0 && <div key={el._id} className={burgerConstructor.container}   className={burgerConstructor.margin}>
{index===0 && <ConstructorElement 
type="top" 
isLocked={true}    
text={el.name}
price={el.price}
thumbnail={el.image}/>}
</div>
}

{ index !== 0 && index !==dataArr.length-1 && <div key={el._id} className={burgerConstructor.container}> 
    {index !== 0 && index !==dataArr.length-1 && <DragIcon type="primary"/>}
    {index !== 0 && index !==dataArr.length-1 && <ConstructorElement
    text={el.name}
    price={el.price}
    thumbnail={el.image}
    /> }
  </div>}

{index === dataArr.length-1 && <div key={el._id} className={burgerConstructor.container}   className={burgerConstructor.margin}>
{index===dataArr.length-1 && <ConstructorElement 
type="bottom" 
isLocked={true}    
text={el.name}
price={el.price}
thumbnail={el.image}/>}
</div>
}
</>  
  )}))
    
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
};




