import {
  ingredientsReducer,
  ingredientsSlice,
  fetchIngredients
} from '../../src/services/slices/ingredients';
import { TIngredient } from '../../src/utils/types';

describe('ingredients reducer', () => {
  const initialState = ingredientsSlice.getInitialState();

  /*  Request (pending) → начался запрос: включаем лоадер.
    Success (fulfilled) → успех: сохраняем данные, выключаем лоадер.
    Failed (rejected) → ошибка: сохраняем текст, выключаем лоадер.
*/

  //pending( отправляем запрос, ингридиентов и ошибок нет, включился лоадер)
  it('должен устанавливать loading=true при fetchIngredients.pending', () => {
    const action = fetchIngredients.pending('', undefined); //сами создали действие
    const state = ingredientsReducer(initialState, action); //добавили в редюсер

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull(); //нет ошибок
    expect(state.ingredients).toEqual([]); //сравниваем фактическое значение с ожидаемым (у нас пустой массив. ингредиенты еще загрузились)
  });

  //fulfijjed (успех, мы получили ингридиенты, ошибок нет)
  it('должен сохранять ингредиенты и устанавливать loading=false при fetchIngredients.fulfilled', () => {
    //мокаем ингредиенты
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Соус',
        type: 'sauce',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];
    const action = fetchIngredients.fulfilled(mockIngredients, '', undefined);
    const state = ingredientsReducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  //в случае ошибки
  it('должен сохранять ошибку, loading=false при fetchIngredients.rejected', () => {

    const errorMessage = 'Ошибка загрузки';
    const action = fetchIngredients.rejected(
      new Error(),
      '',
      undefined, errorMessage
    );

    const state = ingredientsReducer(
      {...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  } )
});
