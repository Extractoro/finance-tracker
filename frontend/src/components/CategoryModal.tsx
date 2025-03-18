import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FinancialTypeEnum } from '@/interfaces/enum/FinancialTypeEnum';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import handleChange from '@/utils/handleChange';
import reset from '@/utils/reset';

interface ICategoryModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (name: string, type: FinancialTypeEnum) => void;
}

const CategoryModal: React.FC<ICategoryModalProps> = ({ isOpen, setIsOpen, onSubmit }) => {
  const initialFormData = { name: '', type: FinancialTypeEnum.income };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError('Category name cannot be empty');
      return;
    }
    setError(null);
    onSubmit(formData.name, formData.type);
    setTimeout(() => {
      setIsOpen(false);
      reset(setFormData, initialFormData);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-header-background p-6 rounded-2xl shadow-lg w-96"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-text mb-4">Create Category</h2>
            {/*{success ? (*/}
            {/*  <p className="text-accent text-center">Category created successfully!</p>*/}
            {/*) :*/}
            {/*  (*/}
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
                    setIsOpen(false);
                    reset(setFormData, initialFormData);
                  }}
                >Cancel
                </button>
                <button
                  className="px-4 py-2 bg-button hover:bg-hover text-white rounded transition-all duration-300"
                  onClick={handleSubmit}
                >Submit
                </button>
              </div>
            </>
            {/*)*/}
            {/*}*/}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CategoryModal;
