import { Field, ObjectType } from '@nestjs/graphql';
import { TransactionsModel } from './transactions.model';

@ObjectType()
export class GetAllTransactionsResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  errorCode?: string | null;

  @Field(() => [TransactionsModel])
  transactions: TransactionsModel[];
}
