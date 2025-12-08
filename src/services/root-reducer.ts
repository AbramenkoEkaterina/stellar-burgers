import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { feedReducer } from './slices/feed';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer
});
