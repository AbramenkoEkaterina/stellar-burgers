import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectFeed,
  selectFeedError,
  selectFeedLoadding
} from '../../services/selectors/feed-selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feed = useSelector(selectFeed);
  const loading = useSelector(selectFeedLoadding);
  const error = useSelector(selectFeedError);

  if (loading) {
    return (
      <div className='text text_type_main-medium text_color_inactive mt-20'>
        Загрузка...
      </div>
    );
  }

  if (error) {
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

  const orders = feed.orders;
  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
