import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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

import { useSelector, useDispatch } from "react-redux";
import { clearOrderNumber } from "../../services/actions/index.js";
import { makeOrderAndGetRequestId } from "../../services/actions";
import { useDrag, useDrop } from "react-dnd";
import {
  CONSTRUCTOR_ADD_ELEMENT,
  CONSTRUCTOR_REMOVE_ELEMENT,
  CONSTRUCTOR_CHANGE_ELEMENT_POSITION,
  INCREMENT_INGREDIENT_QUANTITY,
  DECREMENT_INGREDIENT_QUANTITY,
} from "../../services/actions";

export function BurgerConstructor() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const ingredients = useSelector((store) => store.constructorReducer);
  const dispatch = useDispatch();

  const outerBun = useMemo(
    () =>
      ingredients.find((el) => {
        return el.type === "bun";
      }),
    [ingredients]
  );

  const ingredientsArray = useMemo(
    () =>
      ingredients.filter((el) => {
        return el.type !== "bun";
      }),
    [ingredients]
  );

  const handleOrder = (dataArray) => {
    dispatch(makeOrderAndGetRequestId(dataArray, () => setModalIsOpen(true)));
  };

  const handleModalClose = useCallback(() => {
    setModalIsOpen(false);
    dispatch(clearOrderNumber());
  }, []);

  return (
    <section className={burgerConstructor.section}>
      <ConstructorIngredient
        outerBun={outerBun}
        ingredientsArray={ingredientsArray}
        dataArr={ingredients}
        setTotalPrice={setTotalPrice}
      />

      <div className={burgerConstructor.total}>
        <div className={burgerConstructor.ammount}>
          <div className={burgerConstructor?.price}>{totalPrice}</div>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="medium"
          onClick={() => {
            handleOrder(ingredients);
          }}
        >
          Оформить заказ
        </Button>
      </div>

      {modalIsOpen && (
        <Modal onClose={handleModalClose} title={null}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

function ConstructorIngredient({ ingredientsArray, outerBun, setTotalPrice }) {
  useEffect(() => {
    if (ingredientsArray.length !== 0 || outerBun) {
      const sum = ingredientsArray.reduce((prev, current) => {
        return prev + current?.price;
      }, 0);
      const bunsPrice = outerBun?.price ? outerBun?.price * 2 : 0;
      const totalPrice = sum + bunsPrice;
      setTotalPrice(totalPrice);
    }
  });

  const dispatch = useDispatch();

  const ingredientsDictionary = useSelector(
    (store) => store.ingredientsReducer
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(itemId) {
      const ingredient = ingredientsDictionary.items.find(
        (item) => item._id === itemId.id
      );

      if (ingredient) {
        dispatch({
          type: CONSTRUCTOR_ADD_ELEMENT,
          payload: ingredient,
        });
        dispatch({
          type: INCREMENT_INGREDIENT_QUANTITY,
          payload: itemId.id,
        });
      }
    },
  });

  return (
    <div className={burgerConstructor.scroller} ref={dropTarget}>
      {!outerBun && ingredientsArray.length === 0 && (
        <h3 className={burgerConstructor.empty}>Выберите ингредиенты</h3>
      )}

      {outerBun && (
        <div className={burgerConstructor.margin}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${outerBun?.name ?? ""} (верх)`}
            price={outerBun?.price ?? 0}
            thumbnail={outerBun?.image}
          />
        </div>
      )}

      <div>
        {ingredientsArray.map((el, i) => {
          return <InnerIngredient index={i} el={el} key={i} />;
        })}
      </div>

      {outerBun && (
        <div className={burgerConstructor.margin}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${outerBun?.name} (низ)`}
            price={outerBun?.price}
            thumbnail={outerBun?.image}
          />
        </div>
      )}
    </div>
  );
}

const InnerIngredient = ({ index, el }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ isDrag }, drag] = useDrag({
    type: "newType",
    item: { id: el._id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "newType",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (dragIndex !== undefined && hoverIndex !== undefined) {
        dispatch({
          type: CONSTRUCTOR_CHANGE_ELEMENT_POSITION,
          payload: {
            firstElIndex: dragIndex,
            secondElIndex: hoverIndex,
          },
        });
      }

      item.index = hoverIndex;
    },
  });

  const removeIngredient = (ingredientId, index) => {
    dispatch({
      type: CONSTRUCTOR_REMOVE_ELEMENT,
      payload: index,
    });
    dispatch({
      type: DECREMENT_INGREDIENT_QUANTITY,
      payload: ingredientId,
    });
  };

  drag(drop(ref));

  return (
    <div ref={ref} className={burgerConstructor.container}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        handleClose={() => {
          removeIngredient(el._id, index);
        }}
      />
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

ConstructorIngredient.propTypes = {
  ingredientsArray: PropTypes.array.isRequired,
  outerBun: PropTypes.object,
  setTotalPrice: PropTypes.func,
};
