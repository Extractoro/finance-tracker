'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import Container from '@/components/Container';
import { GET_ALL_CATEGORIES } from '@/graphql/queries/getAllCategories';
import { useQuery } from '@apollo/client';
import CategoriesFilter from '@/components/CategoriesFilter';
import { ICategoriesFilterState, ICategory } from '@/interfaces/categories';
import UserCategoryItem from '@/components/UserCategoryItem';
import { FaPlus } from 'react-icons/fa6';
import CategoryModal from '@/components/CategoryModal';
import DefaultCategoryItem from '@/components/DefaultCategoryItem';
import { cn } from '@/utils/cn';
import { filterCategories } from '@/utils/filterCategories';

const Categories = () => {
  const initialState: ICategoriesFilterState = {
    name: '',
    type: '',
    categoryType: '',
  };
  const [formData, setFormData] = useState<ICategoriesFilterState>(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selected, setSelected] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  const { data, error, loading } = useQuery(GET_ALL_CATEGORIES);

  const userCategories = useMemo(() => data?.getAllCategories?.userCategories || [], [data]);
  const defaultCategories = useMemo(() => data?.getAllCategories?.defaultCategories || [], [data]);

  const filteredUserCategories = useMemo(() => filterCategories(userCategories, formData, 'user'), [userCategories, formData]);
  const filteredDefaultCategories = useMemo(() => filterCategories(defaultCategories, formData, 'default'), [defaultCategories, formData]);

  useEffect(() => {
    if (selected) {
      const category = [...filteredDefaultCategories, ...filteredUserCategories].find(
        (category: ICategory) => category.category_id === selected,
      );
      setSelectedCategory(category || null);
    }
  }, [selected, filteredDefaultCategories, filteredUserCategories]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section>
          <Container>
            <div className="w-full">
              <div className="flex flex-col gap-3 my-4 md:flex-row justify-between">
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setMode('create');
                  }}
                  className="flex items-center gap-3 justify-center bg-button py-2.5 px-6 hover:bg-hover focus:outline-none shadow-md rounded transition-all duration-300">
                  Create new category<FaPlus size={20} />
                </button>
                <CategoriesFilter formData={formData} setFormData={setFormData} />
              </div>

              <div className="flex justify-center mt-16">
                {loading && <p className="text-xl text-center">Loading...</p>}
                {error && <p className="text-xl text-center">Error</p>}
                <ul
                  className="w-full grid grid-cols-1 xm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredDefaultCategories.length > 0 && (
                    <>
                      <p className="col-span-full text-lg font-semibold">Default categories</p>
                      {filteredDefaultCategories.map((category: ICategory) => (
                        <DefaultCategoryItem key={category.category_id} category={category} />
                      ))}
                      {userCategories.length === 0 && filteredUserCategories.length === 0 && !loading && !error && (
                        <hr className="col-span-full border-border border-t-2 my-4" />
                      )}
                    </>
                  )}

                  {filteredUserCategories.length > 0 && (
                    <>
                      <p className={cn("col-span-full text-lg font-semibold", formData.categoryType !== 'user' && 'mt-6')}  >Your categories</p>
                      {filteredUserCategories.map((category: ICategory) => (
                        <UserCategoryItem
                          key={category.category_id}
                          category={category}
                          setIsOpen={setIsOpen}
                          setSelected={setSelected}
                          setMode={setMode}
                        />
                      ))}
                    </>
                  )}
                  {filteredUserCategories.length === 0 && formData.categoryType === 'user' && !loading && !error && (
                    <p className="w-80 col-span-full">You have not got own categories</p>
                  )}
                </ul>
              </div>
            </div>

            <CategoryModal isOpen={isOpen} setIsOpen={setIsOpen} mode={mode} selectedCategory={selectedCategory}
                           selected={selected} />
          </Container>
        </section>
      </main>
    </>
  );
};

const Page = () => {
  return <Suspense fallback={<p className="mt-5 text-center text-xl">Loading...</p>}>
    <Categories />
  </Suspense>;
};

export default Page;
