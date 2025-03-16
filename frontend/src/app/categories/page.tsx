import React, { Suspense } from 'react';
import Header from '@/components/Header';
import Container from '@/components/Container';

const Categories = () => {
  // const {data, error, loading} = useQuery(GET_ALL_CATEGORIES)

  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <section>
          <Container>
            <div className="w-full">asdasd</div>
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
