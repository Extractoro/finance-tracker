import { registerEnumType } from '@nestjs/graphql';

export enum CategoryType {
  income = 'income',
  expense = 'expense',
}

registerEnumType(CategoryType, { name: 'CategoryTypeEnum' });
