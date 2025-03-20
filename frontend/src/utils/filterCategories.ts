import { ICategoriesFilterState, ICategory } from '@/interfaces/categories';

export const filterCategories = (categories: ICategory[], formData: ICategoriesFilterState, categoryType: 'user' | 'default') => {
  return categories.filter((category) => {
    const matchesName = category.name.toLowerCase().includes(formData.name.toLowerCase());
    const matchesType = formData.type === 'all' || formData.type === '' || category.type === formData.type;
    const matchesCategoryType = formData.categoryType === 'all' || formData.categoryType === '' || formData.categoryType === categoryType;
    return matchesName && matchesType && matchesCategoryType;
  });
};
