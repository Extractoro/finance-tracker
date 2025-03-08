'use client';

import React, { ChangeEvent, FormEvent } from 'react';
import { OperationVariables, useMutation } from '@apollo/client';
import { SIGNUP } from '@/qraphql/mutations/signup';
import { SIGNIN } from '@/qraphql/mutations/signin';
import Link from 'next/link';

interface IAuthFormProps<T extends OperationVariables> {
  mode: 'signin' | 'signup';
  formData: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AuthForm = <T extends OperationVariables>({ mode, formData, handleChange }: IAuthFormProps<T>) => {
  const [auth] = useMutation(
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

  return (
    <>
      <div className="flex flex-col max-w-[700px] w-full m-auto">
        <h2 className='font-bold text-3xl text-center mb-6'>{mode === 'signup' ? 'Sign up' : 'Sign in'}</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {mode === 'signup' && (
            <input
              className='p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300'
              type="text" name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            className='p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300'
            type="email" name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className='p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300'
            type="password" name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            className='bg-button py-2.5 hover:bg-hover focus:outline-none shadow-md rounded transition-all duration-300'
            type="submit"
          >{mode === 'signup' ? 'Sign up' : 'Sign in'}</button>
        </form>
        <p className='mt-5'>
          {mode === 'signup'
            ? (
              <>If you already have an account, please <Link className='text-link hover:text-hover  transition-all duration-300' href={'/auth/signin'}>sign in</Link></>
            )
            : (
              <>If you have not got an account, please <Link className='text-link hover:text-hover  transition-all duration-300' href={'/auth/signup'}>sign up</Link></>
            )
          }
        </p>
      </div>
    </>
  );
};
export default AuthForm;
