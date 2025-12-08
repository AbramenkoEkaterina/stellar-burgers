import { getFeedsApi } from '@api';
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
}

const initialState: IFeedState = {
  feed: null,
  loading: false,
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

//слайс лента
const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload || 'Ошибка загрузки ленты';
      });
  }
});

export const feedReducer = feedsSlice.reducer;
