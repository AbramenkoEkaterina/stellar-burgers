import { Navigate } from 'react-router-dom';
import { FC } from 'react';

interface Props {
  element: JSX.Element;
  onlyUnAuth?: boolean;
}

const ProtectedRoute: FC<Props> = ({ element, onlyUnAuth }) => {
  const isAuth = false; // пока так, потом заменишь на реальный стейт

  // если доступ только для НЕавторизованных, а пользователь уже авторизован
  if (onlyUnAuth && isAuth) {
    return <Navigate to='/' replace />;
  }

  // если доступ ТОЛЬКО для авторизованных, а user не авторизован
  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' replace />;
  }

  return element;
};

export default ProtectedRoute;
