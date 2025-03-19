import React, { Dispatch, SetStateAction } from 'react';
import { ICategory } from '@/interfaces/categories';
import { FinancialTypeEnum } from '@/interfaces/enum/FinancialTypeEnum';
import { BiEdit, BiTrash } from 'react-icons/bi';

interface ICategoryItemProps {
  category: ICategory;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setMode: Dispatch<SetStateAction<'edit' | 'create'>>;
  setSelected: Dispatch<SetStateAction<number>>;
}

const CategoryItem = ({category, setIsOpen, setMode, setSelected} : ICategoryItemProps) => {
  return (
    <li
      key={category.category_id}
      value={category.category_id}
      className="relative bg-header-background flex justify-between items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 hover:shadow-lg group"
    >
      <div
        className={`rounded-full w-3 h-3 ${
          category.type === FinancialTypeEnum.expense ? "bg-[#ff4b4b]" : "bg-[#61d345]"
        }`}
      ></div>

      <p className="flex-1 truncate">{category.name}</p>
      <p className="text-sm text-gray-500 opacity-100 transition-opacity duration-200 group-hover:opacity-0">{category.type}</p>

      <div className="absolute top-1/2 right-3 -translate-y-1/2 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button onClick={() => {
          setIsOpen(true);
          setMode('edit')
          setSelected(category.category_id)
        }} className="p-1 text-gray-500 hover:text-hover transition-colors">
          <BiEdit size={18} />
        </button>
        <button className="p-1 text-gray-500 hover:text-red-500 transition-colors">
          <BiTrash size={18} />
        </button>
      </div>
    </li>
  );
};
export default CategoryItem;

