'use client';

import React, { Suspense } from 'react';
import Container from '@/components/Container';
import Header from '@/components/Header';
import TransactionsFilter from '@/components/TransactionsFilter';

const Transactions = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section>
          <Container>
            <div className="w-full">
              <TransactionsFilter />
              <div></div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

const Page = () => {
  return <Suspense fallback={<p className="mt-5 text-center text-xl">Loading...</p>}>
    <Transactions />
  </Suspense>;
};

export default Page;

