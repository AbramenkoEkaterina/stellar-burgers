import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  selectFeed,
  selectFeedError,
  selectFeedLoadding
} from '../../services/selectors/feed-selectors';
import { fetchFeed } from '../../services/slices/feed';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const feed = useSelector(selectFeed);
  const loading = useSelector(selectFeedLoadding);
  const error = useSelector(selectFeedError);

  const orders = feed?.orders || [];

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='text text_type_main-medium text_color_inactive mt-20'>
        Ошибка загрузки ленты: {error}
      </div>
    );
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
