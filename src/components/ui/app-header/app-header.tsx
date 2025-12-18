import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      {/* ЛЕВАЯ ЧАСТЬ */}
      <div className={styles.menu_part_left}>
        {/* Конструктор */}
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.link_active}` : styles.link
          }
        >
          <BurgerIcon type='primary' />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </NavLink>

        {/* Лента заказов */}
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.link_active}` : styles.link
          }
        >
          <ListIcon type='primary' />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </NavLink>
      </div>

      {/* ЛОГО */}
      <div className={styles.logo}>
        <NavLink to='/'>
          <Logo className='' />
        </NavLink>
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}
      <div className={styles.link_position_last}>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.link_active}` : styles.link
          }
        >
          <ProfileIcon type='primary' />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
);
