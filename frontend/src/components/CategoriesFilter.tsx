import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import handleChange from '@/utils/handleChange';
import { FinancialTypeEnum } from '@/interfaces/enum/FinancialTypeEnum';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { ICategoriesFilterState } from '@/interfaces/categories';

const CategoriesFilter = () => {
  const initialState: ICategoriesFilterState = {
    name: '',
    type: 'all',
  };
  const [formData, setFormData] = useState<ICategoriesFilterState>(initialState);

  return (
    <div className="flex flex-col gap-3 md:flex-row justify-between">
      <button
        className="flex items-center gap-3 justify-center bg-button py-2.5 px-6 hover:bg-hover focus:outline-none shadow-md rounded transition-all duration-300">Create
        new category<FaPlus size={20} /></button>
      <div className="grid grid-cols-2 gap-3 transition duration-300">
        <input
          className="p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
          type="text"
          name="name"
          placeholder="Category name"
          value={formData.name}
          onChange={(e) => handleChange<ICategoriesFilterState>(e, setFormData)} />
        <select
          className="p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
          name="type"
          onChange={(e) => handleChange<ICategoriesFilterState>(e, setFormData)}
        >
          <option
            defaultChecked>All
          </option>
          <option value={FinancialTypeEnum.income}>{capitalizeFirstLetter(FinancialTypeEnum.income)}</option>
          <option
            value={FinancialTypeEnum.expense}>{capitalizeFirstLetter(FinancialTypeEnum.expense)}</option>
        </select>
      </div>
    </div>
  );
};
export default CategoriesFilter;
