'use client';

import React, { Suspense } from 'react';
import Container from '@/components/Container';
import Header from '@/components/Header';
import TransactionsFilter from '@/components/TransactionsFilter';
import { FaPlus } from 'react-icons/fa6';

const Transactions = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section>
          <Container>
            <div className="w-full">
              <div className="flex flex-col gap-3 my-4 md:flex-row justify-between">
                <button
                  className="flex items-center gap-3 justify-center bg-button py-2.5 px-6 hover:bg-hover focus:outline-none shadow-md rounded transition-all duration-300">Create
                  new transaction<FaPlus size={20} /></button>
                <TransactionsFilter />
              </div>

              <div></div>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
    ;
};

const Page = () => {
  return <Suspense fallback={<p className="mt-5 text-center text-xl">Loading...</p>}>
    <Transactions />
  </Suspense>;
};

export default Page;

