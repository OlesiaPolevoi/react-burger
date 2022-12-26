import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TCombinedReducer } from '../types';

interface LocationWithState<T> extends Location {
  state: T;
}
interface LocationState {
  from: {
    pathname: string;
  };
}

type TProtectedRouteProps = {
  onlyForAuth: boolean;
  children: React.ReactNode;
  [index: string]: any;
};

export function ProtectedRoute({
  onlyForAuth,
  children,
  ...rest
}: TProtectedRouteProps) {
  const userData = useSelector(
    (store: TCombinedReducer) => store.userDataReducer
  );
  const userAuthorized =
    userData.accessToken !== '' && userData.accessToken !== null;

  const location = useLocation() as LocationWithState<LocationState>;

  if (!onlyForAuth && userAuthorized) {
    const { from } = location.state || { from: { pathname: '/' } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !userAuthorized) {
    return (
      <Route>
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
}
