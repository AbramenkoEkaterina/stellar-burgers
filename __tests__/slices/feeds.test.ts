import { error } from 'console';
import {
  feedReducer,
  fetchFeed,
  getOrderById,
  clearSelectedOrder
} from '../../src/services/slices/feed';
import { TOrder } from '../../src/utils/types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Бургер',
    createdAt: '2026-01-20T00:00:00Z',
    updatedAt: '2026-01-20T01:00:00Z',
    number: 123,
    ingredients: ['abc', 'def']
  }
];

describe('feedReducer', () => {
  const initialState = {
    feed: null,
    loading: false,
    error: null,
    selectedOrder: null
  };

  it('должен включать лоадер при fetchFeed.pending', () => {
    const state = feedReducer(initialState, fetchFeed.pending('', undefined));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные при fetchFeed.fulfilled', () => {
    const action = fetchFeed.fulfilled(
      { orders: mockOrders, total: 10, totalToday: 2 },
      '',
      undefined
    );
    const state = feedReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.feed).toEqual({
      orders: mockOrders,
      total: 10,
      totalToday: 2
    });
  });

  it('должен сохранять ошибку при fetchFeed.rejected', () => {
    const action = fetchFeed.rejected(
      new Error(),
      '',
      undefined,
      'Ошибка загрузки'
    );
    const state = feedReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });

  it('clearSelectedOrder сбрасывает selectedOrder', () => {
    const state = feedReducer(
      { ...initialState, selectedOrder: mockOrders[0] },
      clearSelectedOrder()
    );
    expect(state.selectedOrder).toBeNull();
  });
});
