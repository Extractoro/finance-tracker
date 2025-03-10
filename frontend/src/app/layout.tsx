import './globals.css';
import React from 'react';
import { comfortaaSans, montserratAlternatesSans } from '@/app/layoutConstants';
import { Provider } from '@/graphql/provider';


export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

    <body
      className={`${comfortaaSans.variable} ${montserratAlternatesSans.variable} antialiased`}
    >
        <Provider>{children}</Provider>
    </body>
    </html>
  );
}