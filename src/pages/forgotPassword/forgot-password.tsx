import React, { useCallback } from 'react';
import forgotPassword from './forgot-password.module.css';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/burger-api';
import { TCombinedReducer } from '../../types';

export function ForgotPassword() {
  const userStore = useSelector(
    (store: TCombinedReducer) => store.userDataReducer
  );
  const isUserAuthorized = userStore.accessToken !== '';
  const history = useHistory();
  const [userData, setUserData] = React.useState({
    email: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => {
      return { ...prevUserData, [name]: value };
    });
  };

  const goToLogin = useCallback(() => {
    history.replace({ pathname: '/login' });
  }, [history]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const data = JSON.stringify(userData);

    const getEmailCode = {
      method: 'post',
      url: `${BASE_URL}/password-reset`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    axios(getEmailCode)
      .then(function (response) {
        history.push('/reset-password', { from: 'forgot-password' });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  if (isUserAuthorized) {
    return (
      <Redirect
        to={{
          pathname: '/profile',
        }}
      />
    );
  }
  return (
    <div>
      <form className={forgotPassword.container} onSubmit={handleSubmit}>
        <h2 className={forgotPassword.header}>Восстановление пароля</h2>

        <EmailInput
          onChange={onChange}
          value={userData.email}
          name={'email'}
          isIcon={false}
          placeholder={'Укажите e-mail'}
        />

        <button
          className={forgotPassword.button}
          type='submit'
          disabled={userData.email === '' ? true : false}
        >
          Восстановить
        </button>
      </form>

      <div className={forgotPassword.info}>
        <h4>Вспомнили пароль?</h4>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
          onClick={goToLogin}
        >
          Войти
        </Button>
      </div>
    </div>
  );
}
