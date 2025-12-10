import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectConstructorItems } from '../../services/selectors/constructor-selectors';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItems);

  const { bun, ingredients = [] } = constructorItems || {
    bun: null,
    ingredients: []
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, item) => sum + item.price, 0),
    [bun, ingredients]
  );

  const orderRequest = false;
  const orderModalData = null;

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    // логика создания заказа позже
  };

  const closeOrderModal = () => {
    // позже добавим
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
