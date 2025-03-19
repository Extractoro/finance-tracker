'use client';

import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { OperationVariables, useMutation } from '@apollo/client';
import Link from 'next/link';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { SIGNIN } from '@/graphql/mutations/signin';
import { SIGNUP } from '@/graphql/mutations/signup';
import reset from '@/utils/reset';
import { RESEND_CONFIRM } from '@/graphql/mutations/resend-confirm';
import { useRouter } from 'next/navigation';
import { errorToast, successToast, warningToast } from '@/utils/toast';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { GraphqlError } from '@/interfaces/graphqlError';

interface IAuthFormProps<T extends OperationVariables> {
  mode: 'signin' | 'signup';
  formData: T;
  initialValues: T;
  setFormData: Dispatch<SetStateAction<T>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AuthForm = <T extends OperationVariables>({
                                                  mode,
                                                  formData,
                                                  initialValues,
                                                  setFormData,
                                                  handleChange,
                                                }: IAuthFormProps<T>) => {
  const router = useRouter();
  const [auth] = useMutation(
    mode === 'signup' ? SIGNUP : SIGNIN,
  );
  const [resendConfirm] = useMutation(RESEND_CONFIRM);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await auth({
        variables: formData,
      });

      if (mode === "signin" && !data?.signIn?.success) {
        throw new Error(data?.signIn?.message || "Authentication failed");
      }

      if (mode === "signup" && !data?.signUp?.success) {
        throw new Error(data?.signUp?.message || "Sign-up failed");
      }

      if (mode === "signin") {
        document.cookie = `accessToken=${data.signIn.access_token}; path=/; secure=${process.env.NODE_ENV === "production"}; sameSite=lax; max-age=${3 * 60 * 60}`;
        document.cookie = `refreshToken=${data.signIn.refresh_token}; path=/; secure=${process.env.NODE_ENV === "production"}; sameSite=lax; max-age=${14 * 24 * 60 * 60}`;

        successToast("Signed in successfully");
        router.replace("/dashboard");
      } else if (mode === "signup") {
        successToast("Signed up successfully");
        router.replace("/auth/signin");
      }

      reset(setFormData, initialValues);
    } catch (error) {
      const graphqlError = error as GraphqlError;

      if (graphqlError.cause.message) {
        errorToast(capitalizeFirstLetter(graphqlError.cause.message));
        return;
      }

      if (mode === "signin") {
        errorToast(error instanceof Error ? error.message : "Authentication failed");
      } else if (mode === "signup") {
        errorToast(error instanceof Error ? error.message : "Sign-up failed");
      } else {
        errorToast("Something went wrong");
      }
    }
  };

  const handleResendConfirmation = async () => {
    if (!formData.email || formData.email.length === 0) {
      warningToast('Write an email in input to resent confirmation')
      return;
    }

    const formEmailData = { email: formData.email };
    try {
      await resendConfirm({ variables: formEmailData });
      successToast('Success');

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
      <div
        className="flex z-10 flex-col max-w-[700px] w-full m-auto justify-between bg-background mx-3 p-6 md:p-10 py-14 border-border border-[1px] rounded-2xl shadow-2xl">
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
          {mode === 'signup' && <button onClick={handleResendConfirmation} type="button"
                                        className="contents text-link hover:text-hover transition duration-200">
            Resend confirmation</button>}
          {mode === 'signin' &&
            <Link href="/auth/forget-password" className="contents text-link hover:text-hover transition duration-200">
              Forget password
            </Link>}
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
    </>
  );
};
export default AuthForm;
