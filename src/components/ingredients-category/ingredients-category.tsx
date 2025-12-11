// src/components/ingredients-category/ingredients-category.tsx
import { forwardRef } from 'react';
import { TIngredientsCategoryProps } from './type';
import { IngredientsCategoryUI } from '../ui/ingredients-category';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(
  (
    { title, titleRef, ingredients, counts },
    ref // ✅ Принимаем counts
  ) => (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={counts} // ✅ Передаём как ingredientsCounters
      ref={ref}
    />
  )
);
