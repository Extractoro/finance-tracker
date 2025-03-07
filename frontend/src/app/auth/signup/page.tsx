'use client';

import React, { ChangeEvent, useState } from 'react';
import { ISignUpFormData } from '@/interfaces/auth';
import AuthForm from '@/components/AuthForm';

const Signup = () => {
  const [formData, setFormData] = useState<ISignUpFormData>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    return setFormData((prevState => ({ ...prevState, [name]: value })));
  };

  return (
    <div><AuthForm formData={formData} handleChange={handleChange} mode={'signup'} /></div>
  );
};
export default Signup;
