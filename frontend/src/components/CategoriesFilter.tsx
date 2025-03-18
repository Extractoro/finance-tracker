import React, { Dispatch, SetStateAction } from 'react';
import handleChange from '@/utils/handleChange';
import { FinancialTypeEnum } from '@/interfaces/enum/FinancialTypeEnum';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { ICategoriesFilterState } from '@/interfaces/categories';

interface ICategoriesFilterProps<T> {
  formData: T,
  setFormData: Dispatch<SetStateAction<T>>,
}

const CategoriesFilter = <T extends ICategoriesFilterState>({formData, setFormData}: ICategoriesFilterProps<T>) => {
  return (
      <div className="grid grid-cols-2 gap-3 transition duration-300">
        <input
          className="p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
          type="text"
          name="name"
          placeholder="Category name"
          value={formData.name}
          onChange={(e) => handleChange<T>(e, setFormData)} />
        <select
          className="p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
          name="type"
          onChange={(e) => handleChange<T>(e, setFormData)}
        >
          <option value='all'
            defaultChecked>All
          </option>
          <option value={FinancialTypeEnum.income}>{capitalizeFirstLetter(FinancialTypeEnum.income)}</option>
          <option
            value={FinancialTypeEnum.expense}>{capitalizeFirstLetter(FinancialTypeEnum.expense)}</option>
        </select>
      </div>
  );
};
export default CategoriesFilter;
