import { RootState } from '../store';

export const selectConstructorItems = (state: RootState) => state.burgerconstructor;

export const selectConstructorBun = (state: RootState) => state.burgerconstructor.bun;

export const selectConstructorIngredients = (state: RootState) =>
  state.burgerconstructor.ingredients;
