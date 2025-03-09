import React from 'react';
import GoogleIcon from '@/assets/googleIcon';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.replace(`${process.env.NEXT_PUBLIC_API_URI}/auth/google/callback` as string);
  };

  return <button onClick={handleGoogleLogin} className='flex gap-4 items-center justify-center rounded shadow-md focus:outline-none bg-white text-black py-3'><GoogleIcon size={20}/> Sign in with Google</button>;
};

export default GoogleLoginButton;
