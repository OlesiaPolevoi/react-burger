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
import { getAccessToken, getRefreshToken } from "../../utils/local-storage";
import {
  profileInfoRequest,
  addTokenToUserState,
  tokenRefreshRequest,
} from "../../services/actions/profile-data";
import { isTokenExpired } from "../../utils/jwt-token";

export function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  const refreshToken = getRefreshToken();
  const requests = async () => {
    const accessToken = getAccessToken();

    if (accessToken) {
      if (isTokenExpired(accessToken)) {
        await dispatch(tokenRefreshRequest(refreshToken));
      }
      await dispatch(profileInfoRequest());

      await dispatch(
        addTokenToUserState({
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      );
    }

    await dispatch(getIngredientsFunc());
  };

  useEffect(() => {
    requests();
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
                children={
                  <Modal onClose={handleModalClose} title="Детали ингредиента">
                    <IngredientDetails />
                  </Modal>
                }
              />
            )}
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

            <Route>Страница не найдена</Route>
          </Switch>
        </DndProvider>
      </main>
    </div>
  );
}
