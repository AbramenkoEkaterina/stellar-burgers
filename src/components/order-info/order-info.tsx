import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { selectIngredients } from '../../services/selectors';
import { getSelectedOrder } from '../../services/selectors/feed-selectors';
import { clearSelectedOrder, getOrderById } from '../../services/slices/feed';

export const OrderInfo: FC = () => {
  /** DONE: взять переменные orderData и ingredients из стора */
  const orderData = useSelector(getSelectedOrder);
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  const dispatch = useDispatch();
  const { number } = useParams();

  useEffect(() => {
    if (number) {
      dispatch(getOrderById(Number(number)));
    }
    return () => {
      dispatch(clearSelectedOrder());
    };
  }, [number]);

  if (!orderData || !ingredients.length) {
    return <Preloader />;
  }
  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
