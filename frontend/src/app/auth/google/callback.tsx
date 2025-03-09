// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import cookies from 'js-cookie';
//
// const GoogleAuthCallback = () => {
//   const router = useRouter();
//
//   useEffect(() => {
//     const authenticateUser = async () => {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/auth/google/callback`);
//
//         if (response.status === 200) {
//           cookies.set('accessToken', response.data.accessToken, { expires: 3 / 24 });
//           cookies.set('refreshToken', response.data.refreshToken, { expires: 14 });
//           await router.push('/home');
//         } else {
//           console.error('Authentication failed');
//       //   }
//       // } catch (error) {
//         console.error('Authentication failed:', error);
//       }
//     };
//
//     authenticateUser();
//   }, [router]);
//
//   return <div>Redirecting...</div>;
// };
//
// export default GoogleAuthCallback;
