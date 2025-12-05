import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue
} from '@reduxjs/toolkit'; //создает редюсер и экшены и вторая асинхронный экшен
import { getIngredientsApi } from '@api'; //получаем ток массив ингридиентов
import { TIngredient } from '@utils-types';

interface IIngredientsState {
  ingredients: TIngredient[];
  loading: boolean; //чтоб показывать загрузку
  error: string | null;
}

{
  /* начальное состояние: ингридиентов еще нет, ничего не грузится и ошибок нет */
}
const initialState: IIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetchIngredients', async (_, { rejectWithValue }) => {
  try {
    const ingredients = await getIngredientsApi();
    return ingredients;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
    return rejectWithValue(message);
  }
});

// Слайс
/*  pending → начался запрос: включаем лоадер.
    fulfilled → успех: сохраняем данные, выключаем лоадер.
    rejected → ошибка: сохраняем текст, выключаем лоадер.
*/
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {}, // ← синхронных экшенов пока нет
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload; // payload = TIngredient[]
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
