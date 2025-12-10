import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { feedReducer } from './slices/feed';
import { constructorReducer } from './slices/constructor';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  burgerconstructor: constructorReducer
});
