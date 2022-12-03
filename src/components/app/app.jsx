import { useEffect } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../appHeader/app-header";
import { BurgerIngredients } from "../burgerIngredients/burger-ingredients";
import { BurgerConstructor } from "../burgerConstructor/burger-constructor";
import { useDispatch } from "react-redux";
import { getIngredientsFunc } from "../../services/actions/fetch-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { ProtectedRoute } from "../../pages/protected-route";
import {
  Profile,
  CurrentOrders,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from "../../pages";
import { IngredientDetails } from "../ingredientDetails/ingredient-details";

export function App() {
  let location = useLocation();
  // const history = useHistory();
  // console.log("location--", location);
  // console.log(history.location);
  let background = location.state && location.state.background;
  console.log(background);
  // console.log("background---", background);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsFunc());
  }, []);

  const TestContainer = () => {
    return (
      <>
        <BurgerIngredients />
        <BurgerConstructor />
      </>
    );
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <Switch location={background || location}>
            <Route path={["/", "/ingredients"]} exact>
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            </Route>

            {/* <Route path="/profile">
              <Profile />
            </Route> */}

            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>

            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/forgot-password" exact>
              <ForgotPassword />
            </Route>
            <Route path="/reset-password" exact>
              <ResetPassword />
            </Route>

            <Route path="/ingredients/:_id" exact>
              <IngredientDetails />
            </Route>

            <Route path="/current-orders" exact>
              <CurrentOrders />
            </Route>

            {/* {background && <Route path="/img/:id" children={<Modal />} />} */}

            {/* Show the modal when a background page is set */}
            {/* {background && ( */}
            <Route path="/ingredients/:_id" exact>
              <button>IM BUTTON</button>
            </Route>
            {/* )} */}

            <Route>Страница не найдена</Route>
          </Switch>
        </DndProvider>
      </main>
    </div>
  );
}
