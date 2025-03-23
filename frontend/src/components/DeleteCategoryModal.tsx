import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { errorToast, successToast } from '@/utils/toast';
import { GraphqlError } from '@/interfaces/graphqlError';
import { useMutation } from '@apollo/client';
import { DELETE_CATEGORY } from '@/graphql/mutations/delete-category';
import { ICategory } from '@/interfaces/categories';

interface ICategoryModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedCategory: ICategory;
}

const CategoryModal: React.FC<ICategoryModalProps> = ({ isOpen, setIsOpen, selectedCategory }) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [setIsOpen]);

  const handleCategoryDelete = async (category_id: number) => {
    if (!category_id) {
      errorToast('Category or user not found');
      return;
    }
    try {
      await deleteCategory({ variables: { category_id } });

      successToast(`Successfully deleted category!`);

      setTimeout(() => {
        setIsOpen(false);
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
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={handleOuterClick}
          className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-header-background p-6 rounded-2xl shadow-lg w-96"
          >
            <h2
              className="text-xl font-semibold text-gray-900 dark:text-text mb-4">Are you sure to delete this category? ({selectedCategory.name} | {selectedCategory.type})</h2>
            <>
             <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-900 transition-all duration-300"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >Cancel
                </button>
                <button
                  className="px-4 py-2 bg-button hover:bg-hover text-white rounded transition-all duration-300"
                  onClick={() => handleCategoryDelete(selectedCategory.category_id)}
                >Delete
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
