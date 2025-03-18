"use client";

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  credentials: 'include',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  typeDefs: `
    enum FinancialTypeEnum {
      EXPENSE
      INCOME
    }
  `
});

export default client;
