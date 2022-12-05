import ingredientDetails from "./ingredient-details.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  useLocation,
  Route,
  useHistory,
  useParams,
} from "react-router-dom";
import { getIngredientInfo } from "../../services/actions/ingredient-details";
import { useEffect } from "react";

export function IngredientDetails() {
  let el = useSelector((store) => store.ingredientDetailsReducer);

  let { _id } = useParams();

  const ingredientsStore = useSelector((store) => store.ingredientsReducer);
  const newEl = (ingredientsStore?.items ?? []).find((el) => el._id === _id);
  el = el ?? newEl;

  return (
    <div className={ingredientDetails.container}>
      <img src={el?.image} className={ingredientDetails.img} alt={el?.name} />
      <h3 className={ingredientDetails.description}>{el?.name}</h3>
      <div className={ingredientDetails.nutrition}>
        <div>
          <h4 className={ingredientDetails?.name}>Калории,ккал</h4>
          <div className={ingredientDetails.number}>{el?.calories}</div>
        </div>
        <div>
          <h4 className={ingredientDetails?.name}>Белки, г</h4>
          <div className={ingredientDetails.number}>{el?.proteins}</div>
        </div>
        <div>
          <h4 className={ingredientDetails?.name}>Жиры, г</h4>
          <div className={ingredientDetails.number}>{el?.fat}</div>
        </div>
        <div>
          <h4 className={ingredientDetails?.name}>Углеводы, г</h4>
          <div className={ingredientDetails?.number}>{el?.carbohydrates}</div>
        </div>
      </div>
    </div>
  );
}
