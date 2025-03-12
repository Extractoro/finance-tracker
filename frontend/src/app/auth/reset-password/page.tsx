'use client';

import React, { FormEvent, Suspense, useState } from 'react';
import Particles from '@/components/Particles';
import { particleProps } from '@/interfaces/particles';
import handleChange from '@/utils/handleChange';
import { useMutation } from '@apollo/client';
import { IResetPasswordFormData } from '@/interfaces/auth';
import reset from '@/utils/reset';
import { RESET_PASSWORD } from '@/graphql/mutations/reset-password';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { errorToast } from '@/utils/toast';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { GraphqlError } from '@/interfaces/graphqlError';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const initialValues: IResetPasswordFormData = { password: '' };
  const [formData, setFormData] = useState<IResetPasswordFormData>(initialValues);
  const [resetPassword] = useMutation(RESET_PASSWORD);

  if (!token) {
    return (
      <div className="text-center min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl">Error occurred (token do not provided). Try again or write to support.</p>
        <Link href="/auth/signin"
              className="mt-5 flex items-center gap-3 text-xl text-link hover:text-hover transition duration-300"><FaArrowLeft
          size={20} /> Go back</Link>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await resetPassword({
        variables: { ...formData, token },
      });

      reset(setFormData, initialValues);
      router.replace('/auth/signin');
    } catch (error) {
      const graphqlError = error as GraphqlError;

      if (graphqlError.cause.extensions?.originalError?.errors?.length) {
        errorToast(capitalizeFirstLetter(graphqlError.cause.extensions.originalError.errors[0].message));
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
          <h2 className="font-bold text-3xl text-center mb-6">Reset password</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
              type="password" name="password"
              placeholder="New password"
              value={formData.password}
              onChange={(e) => handleChange<IResetPasswordFormData>(e, setFormData)}
              required
            />
            <button
              className="bg-button py-2.5 hover:bg-hover focus:outline-none shadow-md rounded transition-all duration-300"
              type="submit"
            >Reset password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const Page = () => {
  return <Suspense fallback={<p className="mt-5 text-center text-xl">Loading...</p>}>
    <ResetPassword />
  </Suspense>;
};

export default Page;
