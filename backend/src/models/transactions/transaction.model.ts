import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { FinancialType } from '../enums/financial-type.enum';

@ObjectType()
export class TransactionModel {
  @Field(() => Int)
  transaction_id: number;

  @Field(() => String)
  user_id: string;

  @Field(() => FinancialType)
  type: FinancialType;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Float)
  amount: number;

  @Field(() => Date)
  date: Date;

  @Field(() => Date, { nullable: true })
  created_at: Date | null;

  @Field(() => Date, { nullable: true })
  updated_at: Date | null;
}
