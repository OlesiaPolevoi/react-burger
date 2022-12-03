import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  //const [isUserLoaded, setUserLoaded] = useState(false);
  const userData = useSelector((store) => store.userDataReducer);
  const userAuthorized = userData.accessToken !== ""; //true
  // console.log("userData.accessToken", userData.accessToken);
  // console.log("userAuthorized", userAuthorized);

  // useEffect(() => {
  //   // При монтировании компонента запросим данные о пользователе
  //   if (userAuthorized) {
  //     console.log("userAuthorized", userAuthorized);
  //     setUserLoaded(true);
  //   }
  // }, []);

  // if (!isUserLoaded) {
  //   return null;
  // }

  return (
    <Route
      {...rest}
      render={() =>
        // Если пользователь есть, используем компонент, который передан в ProtectedRoute
        userAuthorized ? children : <Redirect to="/login" />
      }
    />
  );

  // return <Route {...rest} render={() => children} />;
}
