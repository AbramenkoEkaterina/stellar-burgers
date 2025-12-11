import { RootState } from '../store';

export const selectConstructorItems = (state: RootState) =>
  state.burgerconstructor;

export const selectConstructorBun = (state: RootState) =>
  state.burgerconstructor.bun;

export const selectConstructorIngredients = (state: RootState) =>
  state.burgerconstructor.ingredients;

// ✔️ Селектор для количества ингредиентов по _id
export const selectIngredientCount = (state: RootState) => {
  const counts: Record<string, number> = {};

  // начинки
  state.burgerconstructor.ingredients.forEach((item) => {
    counts[item._id] = (counts[item._id] || 0) + 1;
  });

  // булка всегда удваивается
  if (state.burgerconstructor.bun) {
    counts[state.burgerconstructor.bun._id] = 2;
  }

  return counts;
};
