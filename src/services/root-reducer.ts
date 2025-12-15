import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { feedReducer } from './slices/feed';
import { constructorReducer } from './slices/constructor';
import userReducer from '../services/slices/userSlice';
import orderReduser from './slices/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  burgerconstructor: constructorReducer,
  user: userReducer,
  orders: orderReduser
});
