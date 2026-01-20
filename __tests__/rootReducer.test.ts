import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../src/services/root-reducer';
import { ingredientsSlice } from '../src/services/slices/ingredients';
import { constructorSlice } from '../src/services/slices/constructor';
import { orderSlice } from '../src/services/slices/orderSlice';
import { feedsSlice } from '../src/services/slices/feed';
import userReducer, { userSlice } from '../src/services/slices/userSlice';

describe('rootReducer', () => {
  it('должен корректно инициализировать состояние всех слайсов при неизвестном экшене', () => {
    const unknownAction = { type: 'UNKMOWN_ACTION' }; // фейковый экшен
    const initialState = rootReducer(undefined, unknownAction); //начальное состояние с состоянием undefined и нашим неизвестным экшеном.

    //toHaveProperty проверяет, что объект initialState содержит эти ключи
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerconstructor');
    expect(initialState).toHaveProperty('orders');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('user');

    //проверяю содержимое каждого слайса
    expect(initialState.ingredients).toEqual(
      ingredientsSlice.getInitialState()
    );
    expect(initialState.burgerconstructor).toEqual(
      constructorSlice.getInitialState()
    );
    expect(initialState.orders).toEqual(orderSlice.getInitialState());
    expect(initialState.feed).toEqual(feedsSlice.getInitialState());
    expect(initialState.user).toEqual(userSlice.getInitialState());
  });

  it('store должен корректно собирать состояние при использовании configureStore', () => {
    //Создаём реальный store с помощью Redux Toolkit
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerconstructor');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('user');

    expect(state.ingredients).toEqual(ingredientsSlice.getInitialState());
    expect(state.burgerconstructor).toEqual(constructorSlice.getInitialState());
  });
});
