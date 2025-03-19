'use client';

import React, { FormEvent, Suspense, useState } from 'react';
import Particles from '@/components/Particles';
import { particleProps } from '@/interfaces/particles';
import handleChange from '@/utils/handleChange';
import { useMutation } from '@apollo/client';
import { FORGET_PASSWORD } from '@/graphql/mutations/forget-password';
import { IForgetPasswordFormData } from '@/interfaces/auth';
import reset from '@/utils/reset';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { errorToast } from '@/utils/toast';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { GraphqlError } from '@/interfaces/graphqlError';

const ForgetPassword = () => {
  const initialValues: IForgetPasswordFormData = { email: '' };
  const [formData, setFormData] = useState<IForgetPasswordFormData>(initialValues);
  const [forgetPassword] = useMutation(FORGET_PASSWORD);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await forgetPassword({
        variables: formData,
      });

      reset(setFormData, initialValues);
    } catch (error) {
      const graphqlError = error as GraphqlError;

      if (graphqlError.cause.message) {
        errorToast(capitalizeFirstLetter(graphqlError.cause.message));
        return;
      }

      errorToast(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <>
      <div className="relative flex justify-center w-full min-h-screen">
        <Particles {...particleProps} />
        <div
          className="flex z-10 flex-col max-w-[700px] w-full m-auto justify-between bg-background mx-3 p-10 py-14 border-border border-[1px] rounded-2xl shadow-2xl">
          <Link href="/auth/signin"
                className="mb-5 flex items-center gap-3 text-[18px] text-link hover:text-hover transition duration-300"><FaArrowLeft
            size={20} /> Go back</Link>
          <h2 className="font-bold text-3xl text-center mb-6">Forget password</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
              type="email" name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange<IForgetPasswordFormData>(e, setFormData)}
              required
            />
            <button
              className="bg-button py-2.5 hover:bg-hover focus:outline-none shadow-md rounded transition-all duration-300"
              type="submit"
            >Forget password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const Page = () => {
  return <Suspense fallback={<p className="mt-5 text-center text-xl">Loading...</p>}>
    <ForgetPassword />
  </Suspense>;
};

export default Page;
