'use client';

import React, { Suspense, useMemo, useState } from 'react';
import Header from '@/components/Header';
import Container from '@/components/Container';
import { GET_ALL_CATEGORIES } from '@/graphql/queries/getAllCategories';
import { useMutation, useQuery } from '@apollo/client';
import CategoriesFilter from '@/components/CategoriesFilter';
import { ICategoriesFilterState, ICategory } from '@/interfaces/categories';
import CategoryItem from '@/components/CategoryItem';
import { FaPlus } from 'react-icons/fa6';
import { FinancialTypeEnum } from '@/interfaces/enum/FinancialTypeEnum';
import CategoryModal from '@/components/CategoryModal';
import { CREATE_CATEGORY } from '@/graphql/mutations/create-category';
import { GraphqlError } from '@/interfaces/graphqlError';
import { errorToast, successToast } from '@/utils/toast';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

const Categories = () => {
  const initialState: ICategoriesFilterState = {
    name: '',
    type: 'all',
  };
  const [formData, setFormData] = useState<ICategoriesFilterState>(initialState);
  const { data, error, loading } = useQuery(GET_ALL_CATEGORIES);
  const [isOpen, setIsOpen] = useState(false);
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: GET_ALL_CATEGORIES }],
  });

  const categories = useMemo(() => {
    return data?.getAllCategories?.categories || [];
  }, [data]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category: ICategory) => {
      const matchesName = category.name.toLowerCase().includes(formData.name.toLowerCase());
      const matchesType = formData.type === 'all' || category.type === formData.type;
      return matchesName && matchesType;
    });
  }, [categories, formData]);

  const handleCategorySubmit = async (name: string, type: FinancialTypeEnum) => {
    try {
      await createCategory({variables: {name, type}})

      successToast("Successfully created category!");
    } catch (error) {
      const graphqlError = error as GraphqlError;

      if (graphqlError.cause.extensions?.originalError?.errors?.length) {
        errorToast(capitalizeFirstLetter(graphqlError.cause.extensions.originalError.errors[0].message));
        return;
      }
      errorToast("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section>
          <Container>
            <div className="w-full">
              <div className="flex flex-col gap-3 my-4 md:flex-row justify-between">
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex items-center gap-3 justify-center bg-button py-2.5 px-6 hover:bg-hover focus:outline-none shadow-md rounded transition-all duration-300">Create
                  new category<FaPlus size={20} /></button>
                <CategoriesFilter formData={formData} setFormData={setFormData} />
              </div>

              <CategoryModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={handleCategorySubmit} />

              <div className="flex justify-center mt-16">
                {loading && <p className="text-xl text-center">Loading...</p>}
                {error && <p className="text-xl text-center">Error</p>}
                <ul
                  className="w-full grid grid-cols-1 xm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {(filteredCategories?.length > 0) ?
                    filteredCategories?.map((category: ICategory) => (
                      <CategoryItem key={category.category_id} category={category} />
                    )) : <p className="w-80">{(!loading && !error) && 'You have not got any category'}</p>}
                </ul>
              </div>
            </div>
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
