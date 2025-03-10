'use client';

import React, { useState } from 'react';
import { ISignInFormData } from '@/interfaces/auth';
import AuthForm from '@/components/AuthForm';
import handleChange from '@/utils/handleChange';

const Signin = () => {
  const [formData, setFormData] = useState<ISignInFormData>({
    email: '',
    password: '',
  });

  return (
    <div className='min-h-screen flex w-full'>
      <AuthForm
        formData={formData}
        handleChange={(e) => handleChange<ISignInFormData>(e, setFormData)}
        mode={'signin'}
      />
    </div>
  );
};
export default Signin;
