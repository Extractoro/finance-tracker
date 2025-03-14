"use client";

import React, { Suspense } from 'react';
import Header from '@/components/Header';
import Container from '@/components/Container';

const Dashboard = () => {
  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <section>
          <Container>
            <div>asdasd</div>
          </Container>
        </section>
      </main>
    </>
  );
};

const Page = () => {
  return <Suspense fallback={<p className="mt-5 text-center text-xl">Loading...</p>}>
    <Dashboard />
  </Suspense>;
};

export default Page;

