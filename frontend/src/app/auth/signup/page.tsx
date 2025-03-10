'use client';

import React, { useState } from 'react';
import { ISignUpFormData } from '@/interfaces/auth';
import AuthForm from '@/components/AuthForm';
import handleChange from '@/utils/handleChange';

const Signup = () => {
  const [formData, setFormData] = useState<ISignUpFormData>({
    name: '',
    email: '',
    password: '',
  });

  return (
    <>
      <div className='min-h-screen flex w-full'>
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
