import { useEffect, useCallback, useState } from "react";
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
import { Modal } from "../modal/modal";
import { clearIngredientInfo } from "../../services/actions/ingredient-details.js";
export function App() {
  let location = useLocation();
  const history = useHistory();

  let background = location.state && location.state.background;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsFunc());
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleModalClose = useCallback(() => {
    history.goBack();
    dispatch(clearIngredientInfo());
    setModalIsOpen(false);
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <Switch location={background || location}>
            <Route path="/" exact>
              <BurgerIngredients />
              <BurgerConstructor />
            </Route>

            {background && (
              <Route
                path="/ingredients/:_id"
                exact
                children={
                  <Modal onClose={handleModalClose} title="Детали ингредиента">
                    <IngredientDetails />
                  </Modal>
                }
              />
            )}

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

            {/* Show the modal when a background page is set */}
            {/* {background && ( */}
            {/* <Route path="/ingredients/:_id" exact>
              <button>IM BUTTON</button>
            </Route> */}
            {/* )} */}

            <Route>Страница не найдена</Route>
          </Switch>
        </DndProvider>
      </main>
    </div>
  );
}
