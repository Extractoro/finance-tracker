'use client';

import React, { Suspense, useMemo, useState } from 'react';
import Header from '@/components/Header';
import Container from '@/components/Container';
import { GET_ALL_CATEGORIES } from '@/graphql/queries/getAllCategories';
import { useQuery } from '@apollo/client';
import CategoriesFilter from '@/components/CategoriesFilter';
import { ICategoriesFilterState, ICategory } from '@/interfaces/categories';
import CategoryItem from '@/components/CategoryItem';

const Categories = () => {
  const initialState: ICategoriesFilterState = {
    name: '',
    type: 'all',
  };
  const [formData, setFormData] = useState<ICategoriesFilterState>(initialState);
  const { data, error, loading } = useQuery(GET_ALL_CATEGORIES);

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

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section>
          <Container>
            <div className="w-full">
              <CategoriesFilter formData={formData} setFormData={setFormData} />
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
