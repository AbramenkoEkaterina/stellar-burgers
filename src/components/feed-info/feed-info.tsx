import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from '../..//services/store';
import {
  selectFeed,
  selectFeedError,
  selectFeedLoadding
} from '../../services/selector/feed-selectors';
import { fetchFeed } from '../../services/slices/feed';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useDispatch();

  const feed = useSelector(selectFeed);
  const loading = useSelector(selectFeedLoadding);
  const error = useSelector(selectFeedError);
  /** TODO: взять переменные из стора */

  const orders = feed?.orders || [];

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (loading) {
    return (
      <div className='text text_type_main-medium text_color_inactive mt-20'>
        Ошибка: {error}
      </div>
    );
  }

  if (!feed) {
    return (
      <div className='text text_type_main-medium text_color_inactive mt-20'>
        Лента пуста
      </div>
    );
  }
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
