import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import burgerConstructor from './burger-constructor.module.css';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../orderDetails/order-details';
import { useSelector, useDispatch } from 'react-redux';
import {
  submitOrderAndGetId,
  clearOrderNumber,
} from '../../services/actions/submit-order';
import { useDrag, useDrop } from 'react-dnd';
import {
  INCREMENT_INGREDIENT_QUANTITY,
  DECREMENT_INGREDIENT_QUANTITY,
  CLEAR_COUNTER,
} from '../../services/actions/fetch-ingredients';

// import {
//   CONSTRUCTOR_ADD_ELEMENT,
//   CONSTRUCTOR_REMOVE_ELEMENT,
//   CONSTRUCTOR_CHANGE_ELEMENT_POSITION,
//   CONSTRUCTOR_CLEAR_ALL,
// } from '../../services/actions/burger-constructor';

import { ConstructorActions, IngredientActions } from '../../types/index';
import { ingredientType } from '../../utils/types';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';

export function BurgerConstructor() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  //@ts-ignore
  const ingredients = useSelector((store) => store.constructorReducer);
  //@ts-ignore

  const userInfo = useSelector((store) => store.userDataReducer);
  const isUserAuthorized = userInfo.name !== '';
  const history = useHistory();

  const dispatch = useDispatch();

  const outerBun = useMemo(
    () =>
      //@ts-ignore
      ingredients.find((el) => {
        return el?.type === 'bun';
      }),
    [ingredients]
  );

  const ingredientsArray = useMemo(
    () =>
      //@ts-ignore
      ingredients.filter((el) => {
        return el?.type !== 'bun';
      }),
    [ingredients]
  );
  //@ts-ignore
  const submitOrder = (ingredientsArray) => {
    if (isUserAuthorized) {
      //@ts-ignore

      const ingredientTypes = ingredientsArray.map((el) => el.type);
      //@ts-ignore

      const bunIsPresent = ingredientTypes.some((el) => el === 'bun');
      //@ts-ignore

      const mainIsPresent = ingredientTypes.some((el) => el === 'main');
      //@ts-ignore
      const sauceIsPresent = ingredientTypes.some((el) => el === 'sauce');

      const ingredientsArrayCopy = [...ingredientsArray];
      const bunIngredient = ingredientsArrayCopy.find(
        (el) => el.type === 'bun'
      );
      ingredientsArrayCopy.push(bunIngredient);

      if (bunIsPresent && (mainIsPresent || sauceIsPresent)) {
        dispatch(
          //@ts-ignore
          submitOrderAndGetId(
            ingredientsArrayCopy,
            () => setModalIsOpen(true),
            () => dispatch({ type: ConstructorActions.CONSTRUCTOR_CLEAR_ALL }),
            () => dispatch({ type: IngredientActions.CLEAR_COUNTER })
          )
        );
      }
    }
    if (!isUserAuthorized) {
      history.push({ pathname: '/login' });
    }
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
        //@ts-ignore
        // dataArr={ingredients}
        setTotalPrice={setTotalPrice}
      />

      <div className={burgerConstructor.total}>
        <div className={burgerConstructor.ammount}>
          <div className={burgerConstructor.price}>{totalPrice}</div>
          <CurrencyIcon type='primary' />
        </div>
        {/* @ts-ignore */}
        <Button
          type='primary'
          size='medium'
          htmlType='button'
          onClick={() => {
            submitOrder(ingredients);
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

type Props = {
  ingredientsArray: any;
  outerBun: any | undefined;
  setTotalPrice: any;
};
function ConstructorIngredient({
  ingredientsArray,
  outerBun,
  setTotalPrice,
}: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (ingredientsArray.length !== 0 || outerBun) {
      //@ts-ignore
      const sum = ingredientsArray.reduce((prev: any, current: any) => {
        return prev + current?.price;
      }, 0);

      const bunsPrice = outerBun?.price ? outerBun?.price * 2 : 0;
      const totalPrice = sum ? sum + bunsPrice : 0;
      setTotalPrice(totalPrice);
    }
  });

  const ingredientsDictionary = useSelector(
    //@ts-ignore
    (store) => store.ingredientsReducer
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(itemId) {
      const ingredient = ingredientsDictionary.items.find(
        //@ts-ignore
        (item) => item._id === itemId.id
      );
      const uniqueId = uuid();
      const ingredientWithId = { ...ingredient, uuid: uniqueId };

      if (ingredientWithId) {
        dispatch({
          type: ConstructorActions.CONSTRUCTOR_ADD_ELEMENT,
          payload: ingredientWithId,
        });
        dispatch({
          type: IngredientActions.INCREMENT_INGREDIENT_QUANTITY,
          //@ts-ignore
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
            type='top'
            isLocked={true}
            text={`${outerBun?.name ?? ''} (верх)`}
            price={outerBun?.price ?? 0}
            thumbnail={outerBun?.image ?? ''}
          />
        </div>
      )}

      <div>
        {/* @ts-ignore */}
        {ingredientsArray.length !== 0 &&
          ingredientsArray.map((el: any, i: number) => {
            return el?.uuid ? (
              <InnerIngredient index={i} el={el} key={el?.uuid} />
            ) : null;
          })}
      </div>

      {outerBun && (
        <div className={burgerConstructor.margin}>
          <ConstructorElement
            type='bottom'
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
//@ts-ignore
const InnerIngredient = ({ index, el }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ isDrag }, drag] = useDrag({
    type: 'newType',
    item: { id: el?.uuid },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'newType',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      //@ts-ignore
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      //@ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      //@ts-ignore
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (dragIndex !== undefined && hoverIndex !== undefined) {
        dispatch({
          type: ConstructorActions.CONSTRUCTOR_CHANGE_ELEMENT_POSITION,
          payload: {
            firstElIndex: dragIndex,
            secondElIndex: hoverIndex,
          },
        });
      }
      //@ts-ignore
      item.index = hoverIndex;
    },
  });
  //@ts-ignore

  const removeIngredient = (ingredientId, index) => {
    dispatch({
      type: ConstructorActions.CONSTRUCTOR_REMOVE_ELEMENT,
      payload: index,
    });
    dispatch({
      type: IngredientActions.DECREMENT_INGREDIENT_QUANTITY,
      payload: ingredientId,
    });
  };

  drag(drop(ref));

  return (
    <div ref={ref} className={burgerConstructor.container}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={el?.name}
        price={el?.price}
        thumbnail={el?.image}
        handleClose={() => {
          removeIngredient(el._id, index);
        }}
      />
    </div>
  );
};

// Button.propTypes = {
//   //@ts-ignore
//   type: PropTypes.string.isRequired,
//   //@ts-ignore
//   size: PropTypes.string.isRequired,
// };

// ConstructorIngredient.propTypes = {
//   ingredientsArray: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
//   outerBun: ingredientType,
//   setTotalPrice: PropTypes.func,
// };

// InnerIngredient.propTypes = {
//   index: PropTypes.number.isRequired,
//   el: PropTypes.object.isRequired,
// };
