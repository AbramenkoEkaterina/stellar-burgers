import orderReducer, { initialState, createOrder, fetchOrders, getOrderById } from '../../src/services/slices/orderSlice';
import { TOrder } from '../../src/utils/types';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Бургер',
  createdAt: '2026-01-20T00:00:00Z',
  updatedAt: '2026-01-20T01:00:00Z',
  number: 123,
  ingredients: ['abc', 'def']
};

describe('orderReducer', () => {
    const ingredients = ['abc', 'def']
  it('должен включать loading и orderRequest при createOrder.pending', () => {
    const state = orderReducer(initialState, createOrder.pending('', ingredients));

    expect(state.loading).toBe(true);
    expect(state.orderRequest).toBe(true);
  });

  it('должен сохранять заказ при createOrder.fulfilled', () => {
    const action = createOrder.fulfilled({ order: mockOrder, name: 'Бургер' }, '', []);
    const state = orderReducer({ ...initialState, loading: true, orderRequest: true }, action);
    
    expect(state.loading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.orders).toContain(mockOrder);
  });

  it('должен сохранять ошибку при createOrder.rejected', () => {
    const action = createOrder.rejected(new Error(), '', [], 'Ошибка заказа');
    const state = orderReducer({ ...initialState, loading: true, orderRequest: true }, action);
    expect(state.loading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка заказа');
  });
});
