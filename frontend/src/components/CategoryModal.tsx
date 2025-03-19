import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FinancialTypeEnum } from '@/interfaces/enum/FinancialTypeEnum';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import handleChange from '@/utils/handleChange';
import reset from '@/utils/reset';
import { ICategoriesCreateState, ICategory } from '@/interfaces/categories';
import { errorToast, successToast } from '@/utils/toast';
import { GraphqlError } from '@/interfaces/graphqlError';
import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY } from '@/graphql/mutations/create-category';
import { GET_ALL_CATEGORIES } from '@/graphql/queries/getAllCategories';
import { EDIT_CATEGORY } from '@/graphql/mutations/edit-category';

interface ICategoryModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mode: 'create' | 'edit';
  selected: number;
  selectedCategory: ICategory | null
}

const CategoryModal: React.FC<ICategoryModalProps> = ({ isOpen, setIsOpen, mode = 'edit', selected, selectedCategory }) => {
  const initialFormData: ICategoriesCreateState = useMemo(() => ({ name: '', type: FinancialTypeEnum.income }), []) ;
  const [formData, setFormData] = useState<ICategoriesCreateState>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [category] = useMutation(mode === 'create' ? CREATE_CATEGORY : EDIT_CATEGORY, {
    refetchQueries: [{ query: GET_ALL_CATEGORIES }],
  });

  useEffect(() => {
    setFormData({
      name: selectedCategory?.name ?? '',
      type: selectedCategory?.type ?? FinancialTypeEnum.income,
    });
  }, [selectedCategory]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setError(null);
        setIsOpen(false);
        reset(setFormData, initialFormData);
      }
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [setIsOpen, initialFormData, setError, setFormData]);

  const handleCategorySubmit = async (name: string, type: FinancialTypeEnum) => {
    if (!name.trim()) {
      setError('Category name cannot be empty');
      return;
    }
    setError(null);
    try {
      const variables = mode === 'edit' ? { category_id: selected, name, type } : { name, type };
      await category({ variables });

      successToast(`Successfully ${mode === 'create' ? 'created' : 'edited'} category!`);

      setTimeout(() => {
        setIsOpen(false);
        setError(null)
        reset(setFormData, initialFormData);
      }, 500);
    } catch (error) {
      const graphqlError = error as GraphqlError;

      if (graphqlError.cause.message) {
        errorToast(capitalizeFirstLetter(graphqlError.cause.message));
        return;
      }
      errorToast('Something went wrong');
    }
  };

  const handleOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setError(null);
      setIsOpen(false);
      reset(setFormData, initialFormData);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={handleOuterClick}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-header-background p-6 rounded-2xl shadow-lg w-96"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-text mb-4">{mode === 'create' ? 'Create' : 'Edit'}  Category</h2>
            <>
              <label className="block text-gray-700 dark:text-text mb-2">Category Name</label>
              <input
                type="text"
                className="w-full p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
                placeholder="Enter category name"
                name="name"
                value={formData.name}
                required
                onChange={(e) => handleChange(e, setFormData, setError)}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

              <label className="block text-gray-700 dark:text-text mt-4 mb-2">Category Type</label>
              <select
                className="w-full p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
                required
                name="type"
                value={formData.type}
                onChange={(e) => handleChange(e, setFormData)}
              >
                <option value={FinancialTypeEnum.income}>{capitalizeFirstLetter(FinancialTypeEnum.income)}</option>
                <option value={FinancialTypeEnum.expense}>{capitalizeFirstLetter(FinancialTypeEnum.expense)}</option>
              </select>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-900 transition-all duration-300"
                  onClick={() => {
                    setError(null);
                    setIsOpen(false);
                    reset(setFormData, initialFormData);
                  }}
                >Cancel
                </button>
                <button
                  className="px-4 py-2 bg-button hover:bg-hover text-white rounded transition-all duration-300"
                  onClick={() => handleCategorySubmit(formData.name, formData.type)}
                >Submit
                </button>
              </div>
            </>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CategoryModal;
