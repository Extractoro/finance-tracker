'use client';

import React, { useState } from 'react';
import { ISignUpFormData } from '@/interfaces/auth';
import AuthForm from '@/components/AuthForm';
import handleChange from '@/utils/handleChange';
import Particles from '@/components/Particles';
import { particleProps } from '@/interfaces/particles';

const Signup = () => {
  const [formData, setFormData] = useState<ISignUpFormData>({
    name: '',
    email: '',
    password: '',
  });

  return (
    <>
      <div className="relative flex justify-center w-full min-h-screen">
        <Particles {...particleProps} />
        <AuthForm
          formData={formData}
          handleChange={(e) => handleChange<ISignUpFormData>(e, setFormData)}
          mode={'signup'}
        />
      </div>
    </>
  );
};
export default Signup;
