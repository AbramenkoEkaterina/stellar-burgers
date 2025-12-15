import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

//то что возвращает getFeedsApi
export type TFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

//тип ссстояния слайса
interface IFeedState {
  feed: TFeed | null;
  loading: boolean;
  error: string | null;
  selectedOrder: TOrder | null;
}

const initialState: IFeedState = {
  feed: null,
  loading: false,
  selectedOrder: null,
  error: null
};

//загрузка ленты
export const fetchFeed = createAsyncThunk<TFeed, void, { rejectValue: string }>(
  'feed/fetchFeed',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
      return rejectWithValue(message);
    }
  }
);

export const getOrderById = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('feed/getOrderById', async (number, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
    return rejectWithValue(message);
  }
});

const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    // ✅ ДОБАВЬТЕ action для сброса
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  extraReducers: (builder) => {
    // ... fetchFeed cases

    // ✅ ДОБАВЬТЕ cases для getOrderById
    builder
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки заказа';
      });
  }
});

export const { clearSelectedOrder } = feedsSlice.actions;
export const feedReducer = feedsSlice.reducer;
