'use client';

import React, { useState } from 'react';
import { ISignUpFormData } from '@/interfaces/auth';
import AuthForm from '@/components/AuthForm';
import handleChange from '@/utils/handleChange';
import Particles from '@/components/Particles';
import { particleProps } from '@/interfaces/particles';

const Signup = () => {
  const initialValues: ISignUpFormData = {
    name: '',
    email: '',
    password: '',
  }
  const [formData, setFormData] = useState<ISignUpFormData>(initialValues);

  return (
    <>
      <div className="relative flex justify-center w-full min-h-screen">
        <Particles {...particleProps} />
        <AuthForm
          formData={formData}
          initialValues={initialValues}
          setFormData={setFormData}
          handleChange={(e) => handleChange<ISignUpFormData>(e, setFormData)}
          mode={'signup'}
        />
      </div>
    </>
  );
};
export default Signup;
