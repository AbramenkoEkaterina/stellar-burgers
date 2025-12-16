import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchOrders, getOrders } from '../../services/slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** DONE: взять переменную из стора */
  const orders = useSelector(getOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
