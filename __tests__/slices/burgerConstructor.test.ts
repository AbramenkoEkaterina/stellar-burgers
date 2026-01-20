import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../../src/services/slices/constructor';
import { TIngredient } from '../../src/utils/types';

describe('burgerConstructor slice', () => {
  //добавление ингредиента
  it('должен добавлять ингридиент в ingredients, если это не булка', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };

    //мокаю ингридиент
    const ingredient: TIngredient = {
      _id: '1',
      name: 'Соус',
      type: 'sauce',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 50,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const state = constructorReducer(initialState, addIngredient(ingredient));

    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0].name).toBe('Соус');
    expect(state.bun).toBeNull();
  });

  it('должен удалять ингредиент по id', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          _id: '1',
          id: 'abc',
          name: 'Соус',
          type: 'sauce',
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 100,
          price: 50,
          image: '',
          image_mobile: '',
          image_large: ''
        }
      ]
    };

    const state = constructorReducer(initialState, removeIngredient('abc'));

    expect(state.ingredients.length).toBe(0);
  });

  it('должен менять порядок ингредиентов', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { id: '1', name: 'Первый' } as any,
        { id: '2', name: 'Второй' } as any
      ]
    };

    const state = constructorReducer(
      initialState,
      moveIngredient({ from: 0, to: 1 })
    );

    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
  });
});
