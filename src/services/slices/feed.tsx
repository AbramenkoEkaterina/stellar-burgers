import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

// тип состояния ленты
interface IFeedState {
  feed: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  } | null;
  loading: boolean;
  error: string | null;
  selectedOrder: TOrder | null;
}

const initialState: IFeedState = {
  feed: null,
  loading: false,
  error: null,
  selectedOrder: null
};

// загрузка всей ленты
export const fetchFeed = createAsyncThunk<
  { orders: TOrder[]; total: number; totalToday: number },
  void,
  { rejectValue: string }
>('feed/fetchFeed', async (_, { rejectWithValue }) => {
  try {
    const data = await getFeedsApi();
    return data;
  } catch (err: unknown) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Неизвестная ошибка'
    );
  }
});

// загрузка конкретного заказа
export const getOrderById = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('feed/getOrderById', async (number, { rejectWithValue }) => {
  try {
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  } catch (err: unknown) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Неизвестная ошибка'
    );
  }
});

const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // загрузка ленты
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })
      // загрузка отдельного заказа
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
        state.error = action.payload ?? null;
      });
  }
});

export const { clearSelectedOrder } = feedsSlice.actions;
export const feedReducer = feedsSlice.reducer;
