import React from 'react';
import { ICategory } from '@/interfaces/categories';
import { FinancialTypeEnum } from '@/interfaces/enum/FinancialTypeEnum';

interface ICategoryItemProps {
  category: ICategory;
}

const DefaultCategoryItem = ({category} : ICategoryItemProps) => {
  return (
    <li
      key={category.category_id}
      value={category.category_id}
      className="relative bg-header-background flex justify-between items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 hover:shadow-lg"
    >
      <div
        className={`rounded-full w-3 h-3 ${
          category.type === FinancialTypeEnum.expense ? "bg-[#ff4b4b]" : "bg-[#61d345]"
        }`}
      ></div>

      <p className="flex-1 truncate">{category.name}</p>
      <p className="text-sm text-gray-500">{category.type}</p>
    </li>
  );
};
export default DefaultCategoryItem;

