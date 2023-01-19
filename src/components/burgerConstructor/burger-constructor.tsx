import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  Dispatch,
} from "react";
import burgerConstructor from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../orderDetails/order-details";
import { useSelector, useDispatch } from "react-redux";
import {
  submitOrderAndGetId,
  clearOrderNumber,
} from "../../services/actions/submit-order";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { ConstructorActions, IngredientActions } from "../../types/index";
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";
import { TIngredientInfo, TCombinedReducer } from "../../types";
import { getAccessToken } from "../../utils/local-storage";
export function BurgerConstructor() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [loaderIsOpen, setLoaderIsOpen] = useState(false);

  const ingredients = useSelector(
    (store: TCombinedReducer) => store.constructorReducer
  );

  const userInfo = useSelector(
    (store: TCombinedReducer) => store.userDataReducer
  );
  const isUserAuthorized = userInfo.name !== "";
  const history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();

  const outerBun = useMemo(
    () =>
      ingredients.find((el) => {
        return el?.type === "bun";
      }),
    [ingredients]
  ) as TIngredientInfo;

  const ingredientsArray = useMemo(
    () =>
      ingredients.filter((el) => {
        return el?.type !== "bun";
      }),
    [ingredients]
  );

  const submitOrder = (ingredientsArray: TIngredientInfo[]) => {
    if (isUserAuthorized) {
      const ingredientTypes = ingredientsArray.map((el) => el.type);
      const bunIsPresent = ingredientTypes.some((el) => el === "bun");
      const mainIsPresent = ingredientTypes.some((el) => el === "main");
      const sauceIsPresent = ingredientTypes.some((el) => el === "sauce");

      const ingredientsArrayCopy = [...ingredientsArray];
      const bunIngredient = ingredientsArrayCopy.find(
        (el) => el.type === "bun"
      );
      if (bunIngredient) {
        ingredientsArrayCopy.push(bunIngredient);
      }
      const authToken = getAccessToken();

      if (bunIsPresent && (mainIsPresent || sauceIsPresent)) {
        dispatch(
          submitOrderAndGetId(
            ingredientsArrayCopy,
            () => setModalIsOpen(true),
            () => dispatch({ type: ConstructorActions.CONSTRUCTOR_CLEAR_ALL }),
            () => dispatch({ type: IngredientActions.CLEAR_COUNTER }),
            // @ts-ignore
            authToken,
            () => setLoaderIsOpen(true),
            () => setLoaderIsOpen(false)
          )
        );
      }
    }
    if (!isUserAuthorized) {
      history.push({ pathname: "/login" });
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
        setTotalPrice={setTotalPrice}
      />

      <div className={burgerConstructor.total}>
        <div className={burgerConstructor.ammount}>
          <div className={burgerConstructor.price}>{totalPrice}</div>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="medium"
          htmlType="button"
          onClick={() => {
            submitOrder(ingredients);
          }}
        >
          Оформить заказ
        </Button>
        {loaderIsOpen && (
          <Modal onClose={handleModalClose} title={""}>
            <div className={burgerConstructor.loading}>
              Создание заказа может занять до 15-ти секунд...
            </div>
          </Modal>
        )}
      </div>

      {modalIsOpen && (
        <Modal onClose={handleModalClose} title={""}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

type TConstructorIngredientProps = {
  ingredientsArray: TIngredientInfo[];
  outerBun: TIngredientInfo;
  setTotalPrice: (totalPrice: number) => void;
};

function ConstructorIngredient({
  ingredientsArray,
  outerBun,
  setTotalPrice,
}: TConstructorIngredientProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (ingredientsArray.length !== 0 || outerBun) {
      const sum = ingredientsArray.reduce(
        (prev: number, current: TIngredientInfo) => {
          return prev + current?.price;
        },
        0
      );

      const bunsPrice = outerBun?.price ? outerBun?.price * 2 : 0;
      const totalPrice = sum ? sum + bunsPrice : 0;
      setTotalPrice(totalPrice);
    }
  });

  const ingredientsDictionary = useSelector(
    (store: TCombinedReducer) => store.ingredientsReducer
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(itemId: unknown) {
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
            type="top"
            isLocked={true}
            text={`${outerBun?.name ?? ""} (верх)`}
            price={outerBun?.price ?? 0}
            thumbnail={outerBun?.image ?? ""}
          />
        </div>
      )}

      <div>
        {ingredientsArray.length !== 0 &&
          ingredientsArray.map((el: TIngredientInfo, i: number) => {
            return el?.uuid ? (
              <InnerIngredient index={i} el={el} key={el?.uuid} />
            ) : null;
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
type TInnerIngredient = {
  index: number;
  el: TIngredientInfo;
};
const InnerIngredient = ({ index, el }: TInnerIngredient) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ isDrag }, drag] = useDrag({
    type: "newType",
    item: { id: el?.uuid },
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
      const clientOffset = monitor.getClientOffset() as XYCoord;

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

  const removeIngredient = (ingredientId: string, index: number) => {
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
      <DragIcon type="primary" />
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
