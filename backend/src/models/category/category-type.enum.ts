import { registerEnumType } from '@nestjs/graphql';

export enum CategoryType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

registerEnumType(CategoryType, { name: 'CategoryTypeEnum' });
