"use client";

import React, { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/utils/apolloClient';

export const Provider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
