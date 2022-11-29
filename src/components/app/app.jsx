import { useEffect } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../appHeader/app-header";
import { BurgerIngredients } from "../burgerIngredients/burger-ingredients";
import { BurgerConstructor } from "../burgerConstructor/burger-constructor";
import { useDispatch } from "react-redux";
import { getIngredientsFunc } from "../../services/actions/fetch-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route } from "react-router-dom";
import {
  Profile,
  CurrentOrders,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from "../../pages";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsFunc());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <Switch>
            <Route path="/" exact>
              <BurgerIngredients />
              <BurgerConstructor />
            </Route>

            <Route path="/profile" exact>
              <Profile />
            </Route>
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

            {/* NOTE - modal - ish 
            <Route path="/ingredients/:id" exact>
              <Ingredient-Details />?
            </Route> */}

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
