import { Navigate, useLocation } from 'react-router-dom';
import { FC } from 'react';

type Props = {
  children: JSX.Element;
  isAuth?: boolean;
};

export const ProtectedRoute: FC<Props> = ({ children, isAuth = false }) => {
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
