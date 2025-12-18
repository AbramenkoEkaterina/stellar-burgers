import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// базовые селекторы
export const selectConstructorItems = (state: RootState) =>
  state.burgerconstructor;
export const selectConstructorBun = (state: RootState) =>
  state.burgerconstructor.bun;
export const selectConstructorIngredients = (state: RootState) =>
  state.burgerconstructor.ingredients;

// мемоизированный селектор для подсчёта ингредиентов
export const selectIngredientCount = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (bun, ingredients) => {
    const counts: Record<string, number> = {};

    ingredients.forEach((item) => {
      counts[item._id] = (counts[item._id] || 0) + 1;
    });

    if (bun) {
      counts[bun._id] = 2; // булка всегда удваивается
    }

    return counts;
  }
);
