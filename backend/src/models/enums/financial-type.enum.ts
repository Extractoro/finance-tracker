import { registerEnumType } from '@nestjs/graphql';

export enum FinancialType {
  income = 'income',
  expense = 'expense',
}

registerEnumType(FinancialType, { name: 'FinancialTypeEnum' });
