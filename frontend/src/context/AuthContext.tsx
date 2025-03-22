// "use client";
//
// import { createContext, ReactNode, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useQuery } from '@apollo/client';
// import { REFRESH_TOKEN } from '@/graphql/mutations/refresh-token';
//
// interface AuthContextType {
//   user: any | null;
//   loading: boolean;
//   logout: () => void;
// }
//
// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   logout: () => {},
// });
//
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { data } = useQuery(REFRESH_TOKEN)
//   const router = useRouter();
//
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URI}/me`, {
//           method: "GET",
//           credentials: "include",
//         });
//
//         if (res.ok) {
//           const data = await res.json();
//           setUser(data.user);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Ошибка проверки авторизации", error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     checkAuth();
//   }, []);
//
//   const logout = async () => {
//     await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URI}/logout`, {
//       method: "POST",
//       credentials: "include",
//     });
//
//     setUser(null);
//     router.push("/login");
//   };
//
//   return (
//     <AuthContext.Provider value={{ user, loading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
