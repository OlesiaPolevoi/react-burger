import { useEffect, useCallback, useState, Dispatch } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../appHeader/app-header";
import { BurgerIngredients } from "../burgerIngredients/burger-ingredients";
import { BurgerConstructor } from "../burgerConstructor/burger-constructor";
import { getIngredientsFunc } from "../../services/actions/fetch-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { ProtectedRoute } from "../../pages/protected-route";
import {
  Profile,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from "../../pages";
import { IngredientDetails } from "../ingredientDetails/ingredient-details";
import { Modal } from "../modal/modal";
import { clearIngredientInfo } from "../../services/actions/ingredient-details";
import { getAccessToken, getRefreshToken } from "../../utils/local-storage";
import {
  profileInfoRequest,
  addTokenToUserState,
  tokenRefreshRequest,
} from "../../services/actions/profile-data";
import { isTokenExpired } from "../../utils/jwt-token";
import { TRefreshToken } from "../../types/index";
import { CurrentOrdersDetails } from "../../pages/currentOrdersDetails/current-orders-details";
import { ProfileOrdersDetails } from "../../pages/profileOrdersDetails/profile-orders-details";
import { useAppDispatch } from "../../services/hooks";

interface LocationWithState<T> extends Location {
  state: T;
}
interface LocationState {
  background: boolean;
}

export function App() {
  const dispatch: Dispatch<any> = useAppDispatch();
  const history = useHistory();
  const location = useLocation() as LocationWithState<LocationState>;

  const background = location.state && location.state.background;

  const refreshToken = getRefreshToken() as TRefreshToken;
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
          {/* @ts-ignore */}
          <Switch location={background || location}>
            <Route path="/" exact>
              <BurgerIngredients />
              <BurgerConstructor />
            </Route>

            <ProtectedRoute onlyForAuth={true} path="/profile" exact>
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute onlyForAuth={true} path="/profile/orders" exact>
              <Profile />
            </ProtectedRoute>

            <ProtectedRoute
              onlyForAuth={true}
              path="/profile/orders/:_id"
              exact
              children={
                <Modal onClose={handleModalClose} title="">
                  <ProfileOrdersDetails />
                </Modal>
              }
            />

            <ProtectedRoute onlyForAuth={false} path="/login" exact>
              <Login />
            </ProtectedRoute>

            <ProtectedRoute onlyForAuth={false} path="/register" exact>
              <Register />
            </ProtectedRoute>

            <ProtectedRoute onlyForAuth={false} path="/forgot-password" exact>
              <ForgotPassword />
            </ProtectedRoute>

            <ProtectedRoute onlyForAuth={false} path="/reset-password" exact>
              <ResetPassword />
            </ProtectedRoute>

            <Route path="/ingredients/:_id" exact>
              <IngredientDetails />
            </Route>

            <Route path="/feed" exact>
              <Feed />
            </Route>

            <Route
              path="/feed/:_id"
              exact
              children={
                <Modal onClose={handleModalClose} title="">
                  <CurrentOrdersDetails />
                </Modal>
              }
            />
            <Route path="/profile/exit">Signed out</Route>
            <Route>Page not found</Route>
          </Switch>

          {background && (
            <Route
              path="/ingredients/:_id"
              exact
              children={
                <Modal onClose={handleModalClose} title="Ingredient details">
                  <IngredientDetails />
                </Modal>
              }
            />
          )}

          {background && (
            <Route
              path="/feed/:_id"
              exact
              children={
                <Modal onClose={handleModalClose} title="">
                  <CurrentOrdersDetails />
                </Modal>
              }
            />
          )}
        </DndProvider>
      </main>
    </div>
  );
}
