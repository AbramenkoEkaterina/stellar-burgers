import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Modal, OrderInfo, IngredientDetails } from '@components';

import {
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate
} from 'react-router-dom';

import ProtectedRoute from '../protected-route/protected-route';

const App = () => (
  <Router>
    <div className={styles.app}>
      <AppHeader />
      <AppRoutes />
    </div>
  </Router>
);

const AppRoutes = () => {
  const navigate = useNavigate();
  const closeModal = () => navigate(-1);

  return (
    <Routes>
      {/*Главная */}
      <Route path='/' element={<ConstructorPage />} />

      {/*лента заказов */}
      <Route path='/feed' element={<Feed />} />

      {/*авторизация */}
      <Route
        path='/login'
        element={<ProtectedRoute onlyUnAuth element={<Login />} />}
      />

      <Route
        path='/register'
        element={<ProtectedRoute onlyUnAuth element={<Register />} />}
      />

      <Route
        path='/forgot-password'
        element={<ProtectedRoute onlyUnAuth element={<ForgotPassword />} />}
      />

      <Route
        path='/reset-password'
        element={<ProtectedRoute onlyUnAuth element={<ResetPassword />} />}
      />

      {/*Профиль */}
      <Route
        path='/profile'
        element={<ProtectedRoute element={<Profile />} />}
      />

      <Route
        path='/profile/orders'
        element={<ProtectedRoute element={<ProfileOrders />} />}
      />

      {/*модалки */}
      <Route
        path='/feed/:number'
        element={
          <Modal title='Информация о заказе' onClose={closeModal}>
            <OrderInfo />
          </Modal>
        }
      />

      <Route
        path='/ingredients/:id'
        element={
          <Modal title='Ингредиент' onClose={closeModal}>
            <IngredientDetails />
          </Modal>
        }
      />

      <Route
        path='/profile/orders/:number'
        element={
          <ProtectedRoute
            element={
              <Modal title='Информация о заказе' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
        }
      />

      <Route path='*' element={<NotFound404 />} />
    </Routes>
  );
};

export default App;
