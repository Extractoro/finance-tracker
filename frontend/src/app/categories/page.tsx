'use client';

import React, { Suspense } from 'react';
import Header from '@/components/Header';
import Container from '@/components/Container';
import { GET_ALL_CATEGORIES } from '@/graphql/queries/getAllCategories';
import { useQuery } from '@apollo/client';
import CategoriesFilter from '@/components/CategoriesFilter';
import { ICategory } from '@/interfaces/categories';
import CategoryItem from '@/components/CategoryItem';

const Categories = () => {
  const { data, error, loading } = useQuery(GET_ALL_CATEGORIES);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section>
          <Container>
            <div className="w-full">
              <CategoriesFilter />
              <div className="flex justify-center mt-16">
                {loading && <p className="text-xl text-center">Loading...</p>}
                {error && <p className="text-xl text-center">Error</p>}
                  <ul className="w-full grid grid-cols-1 xm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {/*<ul className='flex flex-wrap gap-16 content-start w-full'>*/}
                    {(data?.getAllCategories?.categories.length > 0) ?
                      data?.getAllCategories?.categories.map((category: ICategory) => (
                        <CategoryItem key={category.category_id} category={category} />
                      )) : <p>{(!loading && !error) && 'You have not got any category'}</p>}
                  </ul>
                  {/*</ul>*/}
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
