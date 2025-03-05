import { Field, ObjectType } from '@nestjs/graphql';
import { TransactionModel } from './transaction.model';

@ObjectType()
export class EditTransactionResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  errorCode?: string | null;

  @Field(() => TransactionModel, { nullable: true })
  transaction?: TransactionModel;
}
