import React, { useState, useEffect, Dispatch } from 'react';
import profile from './profile.module.css';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  profileInfoRequest,
  profileInfoUpdate,
  userExitRequest,
} from '../../services/actions/profile-data';
import { getRefreshToken } from '../../utils/local-storage';
import { TCombinedReducer } from '../../types';

export function Profile() {
  const refreshToken = getRefreshToken() as string;

  const isProfile = !!useRouteMatch({ path: '/profile', exact: true });
  const isOrderHistory = !!useRouteMatch('/profile/orders');
  const isExit = !!useRouteMatch('/profile/exit');
  const userInfo = useSelector(
    (store: TCombinedReducer) => store.userDataReducer
  );

  const [userData, setUserData] = useState({
    name: `${userInfo.name}`,
    email: `${userInfo.email}`,
    password: '',
  });
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(profileInfoRequest());
  }, []);

  useEffect(() => {
    if (!userInfo.loading) {
      setUserData({
        name: userInfo.name,
        email: userInfo.email,
        password: '',
      });
    }
  }, [userInfo]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => {
      return { ...prevUserData, [name]: value };
    });
  };
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  function submitProfileChanges(event: React.FormEvent) {
    event.preventDefault();
    dispatch(profileInfoUpdate(userData));
  }

  const toPreviousInput = () => {
    setUserData({
      name: `${userInfo.name}`,
      email: `${userInfo.email}`,
      password: '',
    });
  };

  const userLogout = (refreshToken: string) => {
    dispatch(userExitRequest(refreshToken));
  };
  return (
    <div className={profile.wrapper}>
      <div>
        <div className={profile.tabs}>
          <Link
            to='/profile'
            className={isProfile ? profile.tab : profile.tabInactive}
          >
            Профиль
          </Link>
          <Link
            to='/profile/orders'
            className={isOrderHistory ? profile.tab : profile.tabInactive}
          >
            История заказов
          </Link>
          <Link
            to='/profile/exit'
            className={isExit ? profile.tab : profile.tabInactive}
            onClick={() => {
              userLogout(refreshToken);
            }}
          >
            Выход
          </Link>
        </div>
        <p className={profile.paragraph}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <form className={profile.container} onSubmit={submitProfileChanges}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={userData.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
          onIconClick={onIconClick}
          ref={inputRef}
        />

        <EmailInput
          onChange={onChange}
          value={userData.email}
          name={'email'}
          placeholder='Логин'
          isIcon={true}
        />

        <PasswordInput
          onChange={onChange}
          value={userData.password}
          name={'password'}
          icon='EditIcon'
        />

        <div className={profile.buttons}>
          <Button
            htmlType='button'
            type='secondary'
            size='medium'
            onClick={() => {
              toPreviousInput();
            }}
          >
            Отмена
          </Button>
          <button className={profile.button} type='submit'>
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
