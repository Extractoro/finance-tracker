import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteTransactionResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  errorCode?: string | null;
}
