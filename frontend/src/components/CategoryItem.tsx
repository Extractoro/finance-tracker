import React from 'react';
import { ICategory } from '@/interfaces/categories';
import { FinancialTypeEnum } from '@/interfaces/enum/FinancialTypeEnum';

interface ICategoryItemProps {
  category: ICategory;
}

const CategoryItem = ({category} : ICategoryItemProps) => {
  return (
    <li key={category.category_id} value={category.category_id} className='bg-header-background break-words flex justify-center items-center gap-3 px-4 py-3 rounded-md'>
      <div className={`rounded-[50%] min-w-2 min-h-2 ${category.type === FinancialTypeEnum.expense ? 'bg-[#ff4b4b]' : 'bg-[#61d345]'}`}></div>
      <p className='break-words truncate'>{category.name}</p>|
      <p>{category.type}</p>
    </li>
  );
};
export default CategoryItem;

