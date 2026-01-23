import userReducer, {
  initialState,
  loginUser
} from '../../src/services/slices/userSlice';
import { TUser } from '../../src/utils/types';

const mockUser: TUser = {
  name: 'Иван',
  email: 'ivan@example.com'
};

const loginData = {
  email: 'ivan@example.com',
  password: '123'
};

describe('userReducer', () => {
  it('должен включать loading при loginUser.pending', () => {
    const state = userReducer(
      initialState,
      loginUser.pending('', loginData)
    );

    expect(state.loading).toBe(true);
    expect(state.loginUserError).toBeNull();
  });

  it('должен сохранять пользователя при loginUser.fulfilled', () => {
    const action = loginUser.fulfilled(mockUser, '', loginData);

    const state = userReducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен сохранять ошибку при loginUser.rejected', () => {
    const action = loginUser.rejected(
      new Error(),
      '',
      loginData,
      'Ошибка логина'
    );

    const state = userReducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.loginUserError).toBe('Ошибка логина');
    expect(state.isAuthChecked).toBe(true);
  });
});
