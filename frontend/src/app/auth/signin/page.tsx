'use client';

import React, { useState } from 'react';
import { ISignInFormData } from '@/interfaces/auth';
import AuthForm from '@/components/AuthForm';
import handleChange from '@/utils/handleChange';
import Particles from '@/components/Particles';
import { particleProps } from '@/interfaces/particles';

const Page = () => {
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
export default Page;
