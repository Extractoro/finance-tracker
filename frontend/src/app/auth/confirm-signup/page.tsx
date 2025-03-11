'use client';

import React, { Suspense, useLayoutEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import CONFIRM_SIGNUP from '@/graphql/mutations/confirm-signup';

const ConfirmSignup = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [confirmSignup, { loading }] = useMutation(CONFIRM_SIGNUP);
  const [status, setStatus] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!token) {
      setErrorMessage('Error occurred (token do not provided). Try again or write to support.');
      return;
    }

    try {
      confirmSignup({ variables: { token } }).then(
        res => {
          if (res?.data?.confirmSignup.success) {
            setStatus(true);
            setTimeout(() => router.replace('/auth/signin'), 2000);
          } else {
            setStatus(false);
          }
        },
      ).catch(err => {
        if (err.message === 'Invalid or expired token') {
          setErrorMessage('The token is invalid or has expired. Please try again.');
        } else {
          setErrorMessage('An unknown error occurred. Please try again.');
        }
        setStatus(false);
      });
    } catch {
      setErrorMessage('An unexpected error occurred.');
      setStatus(false);
    }
  }, [token, confirmSignup, router]);

  return (
    <div className="text-center min-h-screen flex flex-col items-center justify-center">
      {loading && <p className="text-xl">Confirmation...</p>}
      {status === true && <p className="text-xl">Email successfully verified! Please sign in. Redirect...</p>}
      {status === false && <>
        <p className="text-xl">{errorMessage || 'Confirmation error!'}</p>
        <Link href="/auth/signin"
              className="mt-5 flex items-center gap-3 text-xl text-link hover:text-hover transition duration-300"><FaArrowLeft
          size={20} /> Go back</Link>
      </>}
    </div>
  );
};


const Page = () => {
  return <Suspense fallback={<p className="mt-5 text-center text-xl">Loading...</p>}>
    <ConfirmSignup />
  </Suspense>;
};
export default Page;
