import React, { useState, useCallback, Dispatch } from 'react';
import login from './login.module.css';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLoginRequest } from '../../services/actions/user-data';
import { Redirect } from 'react-router-dom';
import { TCombinedReducer } from '../../types';

interface LocationWithState<T> extends Location {
  state: T;
}
interface LocationState {
  from: string;
}

export function Login() {
  const userStore = useSelector(
    (store: TCombinedReducer) => store.userDataReducer
  );
  const isUserAuthorized = userStore.accessToken !== '';
  const location = useLocation() as LocationWithState<LocationState>;
  const history = useHistory();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const dispatch: Dispatch<any> = useDispatch();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => {
      return { ...prevUserData, [name]: value };
    });
  };

  const goToRegister = useCallback(() => {
    history.replace({ pathname: '/register' });
  }, [history]);

  const goToForgotPassword = useCallback(() => {
    history.replace({ pathname: '/forgot-password' });
  }, [history]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch(
      userLoginRequest(userData, () => history.replace({ pathname: '/' }))
    );
  }

  if (isUserAuthorized) {
    return <Redirect to={location?.state?.from || '/'} />;
  }
  return (
    <div>
      <form className={login.container} onSubmit={handleSubmit}>
        <h2 className={login.header}>Вход</h2>

        <EmailInput
          onChange={onChange}
          value={userData.email}
          name={'email'}
          isIcon={false}
        />

        <PasswordInput
          onChange={onChange}
          value={userData.password}
          name={'password'}
          extraClass='mb-2'
        />
        <button className={login.button} type='submit'>
          Войти
        </button>
      </form>

      <div className={login.info}>
        <h4>Вы — новый пользователь?</h4>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
          onClick={goToRegister}
        >
          Зарегистрироваться
        </Button>
      </div>
      <div className={login.info}>
        <h4>Забыли пароль?</h4>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
          onClick={goToForgotPassword}
        >
          Восстановить пароль
        </Button>
      </div>
    </div>
  );
}
