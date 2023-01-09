import appHeader from './app-header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TCombinedReducer } from '../../types';
import React from 'react';

export function AppHeader() {
  const userInfo = useSelector((store: TCombinedReducer) => {
    return store.userDataReducer;
  });
  const isUserAuthorized = userInfo.name !== '';

  const isConstructor = !!useRouteMatch({ path: '/', exact: true });
  const isCurrentOrders = !!useRouteMatch('/feed');
  const isProfile = !!useRouteMatch('/profile');

  return (
    <header className={appHeader.header}>
      <nav className={appHeader.container}>
        <div className={appHeader.elements}>
          <NavigationLink
            text='Конструктор'
            icon={
              isConstructor ? (
                <BurgerIcon type='primary' />
              ) : (
                <BurgerIcon type='secondary' />
              )
            }
            inactive={isConstructor ? false : true}
            path='/'
          />

          <NavigationLink
            text='Лента заказов'
            icon={
              isCurrentOrders ? (
                <ListIcon type='primary' />
              ) : (
                <ListIcon type='secondary' />
              )
            }
            inactive={isCurrentOrders ? false : true}
            path='/feed'
          />
        </div>
        <Link to='/'>
          <Logo />
        </Link>
        <NavigationLink
          text={isUserAuthorized ? userInfo?.name : 'Личный кабинет'}
          icon={
            isProfile ? (
              <ProfileIcon type='primary' />
            ) : (
              <ProfileIcon type='secondary' />
            )
          }
          inactive={isProfile ? false : true}
          path='/profile'
        />
      </nav>
    </header>
  );
}

type TNavigateProps = {
  text: string;
  inactive: boolean;
  icon: React.ReactNode;
  path: string;
};

function NavigationLink({ text, icon, inactive, path }: TNavigateProps) {
  return (
    <Link
      to={`${path}`}
      className={`${appHeader.link} ${inactive ? appHeader.inactive : ''}`}
    >
      {icon}
      <span className={appHeader.text}>{text}</span>
    </Link>
  );
}
