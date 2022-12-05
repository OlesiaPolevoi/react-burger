import { useEffect, useCallback, useState } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../appHeader/app-header";
import { BurgerIngredients } from "../burgerIngredients/burger-ingredients";
import { BurgerConstructor } from "../burgerConstructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
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
import { profileInfoRequest } from "../../services/actions/profile-data";
import { addTokenToUserState } from "../../services/actions/profile-data";
export function App() {
  const userInfo = useSelector((store) => store.userDataReducer);
  let location = useLocation();
  const history = useHistory();

  let background = location.state && location.state.background;

  const dispatch = useDispatch();

  useEffect(() => {
    //check if redux if full
    //if yes, we are happy
    const isUserAuthorized = userInfo.accessToken !== ""; //true
    // console.log("isUserAuthorized", isUserAuthorized);

    //if not, check local storage for access token
    //if not - we are done here
    const refreshToken = getRefreshToken();
    const accessToken = getAccessToken();
    const isAccessTokenAvailable = accessToken !== "";

    //NOTE if we have AT in local storage - fetch auth data and fill redux

    //console.log("isAccessTokenAvailable", isAccessTokenAvailable);
    //set access token and refresh token to redux
    if (isAccessTokenAvailable) {
      dispatch(profileInfoRequest());
      dispatch(
        addTokenToUserState({
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      );
    }

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
