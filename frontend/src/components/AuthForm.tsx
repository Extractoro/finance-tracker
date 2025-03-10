'use client';

import React, { ChangeEvent, FormEvent } from 'react';
import { OperationVariables, useMutation } from '@apollo/client';
import Link from 'next/link';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { SIGNIN } from '@/graphql/mutations/signin';
import { SIGNUP } from '@/graphql/mutations/signup';
import Particles from '@/components/Particles';

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
      <div className="relative flex justify-center w-full min-h-screen">
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={1000}
            particleSpread={10}
            speed={0.12}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>

        <div
          className="flex z-10 flex-col max-w-[700px] w-full m-auto justify-between bg-background mx-3 p-10 py-14 border-border border-[1px] rounded-2xl shadow-2xl">
          <h2 className="font-bold text-3xl text-center mb-6">{mode === 'signup' ? 'Sign up' : 'Sign in'}</h2>
          <GoogleLoginButton />
          <p className="my-4 text-center text-xl">OR</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <input
                className="p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
                type="text" name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}
            <input
              className="p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
              type="email" name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
              type="password" name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              className="bg-button py-2.5 hover:bg-hover focus:outline-none shadow-md rounded transition-all duration-300"
              type="submit"
            >{mode === 'signup' ? 'Sign up' : 'Sign in'}</button>
          </form>
          <p className="mt-5">
            {mode === 'signup'
              ? (
                <>If you already have an account, please <Link
                  className="text-link hover:text-hover transition-all duration-300" href={'/auth/signin'}>sign
                  in</Link></>
              )
              : (
                <>If you have not got an account, please <Link
                  className="text-link hover:text-hover transition-all duration-300" href={'/auth/signup'}>sign
                  up</Link>
                </>
              )
            }
          </p>
        </div>

      </div>

    </>
  );
};
export default AuthForm;
