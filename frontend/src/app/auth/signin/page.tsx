'use client';

import React, { Suspense, useState } from 'react';
import { ISignInFormData } from '@/interfaces/auth';
import AuthForm from '@/components/AuthForm';
import handleChange from '@/utils/handleChange';
import Particles from '@/components/Particles';
import { particleProps } from '@/interfaces/particles';

const Signin = () => {
  const initialValues: ISignInFormData = {
    email: '',
    password: '',
  }
  const [formData, setFormData] = useState<ISignInFormData>(initialValues);

  return (
    <div className="relative flex justify-center w-full min-h-screen">
      <Particles {...particleProps} />
      <AuthForm
        formData={formData}
        initialValues={initialValues}
        setFormData={setFormData}
        handleChange={(e) => handleChange<ISignInFormData>(e, setFormData)}
        mode={'signin'}
      />
    </div>
  );
};

const Page = () => {
  return <Suspense fallback={<p className="mt-5 text-center text-xl">Loading...</p>}>
    <Signin />
  </Suspense>;
};

export default Page;
