'use client';

import React, { ChangeEvent, FormEvent } from 'react';
import { OperationVariables, useMutation } from '@apollo/client';
import { SIGNUP } from '@/qraphql/mutations/signup';
import { SIGNIN } from '@/qraphql/mutations/signin';

interface IAuthFormProps<T extends OperationVariables> {
  mode: 'signin' | 'signup';
  formData: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AuthForm = <T extends OperationVariables>({ mode, formData, handleChange }: IAuthFormProps<T>) => {
  const [auth, { loading, error }] = useMutation(
    mode === 'signup' ? SIGNUP : SIGNIN,
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await auth({
        variables: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>

  return (
    <>
      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        )}
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password}
               onChange={handleChange} />
        <button type="submit">{mode === 'signup' ? 'Sign up' : 'Sign in'}</button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </>
  );
};
export default AuthForm;
