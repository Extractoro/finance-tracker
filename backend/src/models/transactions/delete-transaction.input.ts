import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class DeleteTransactionInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'Transaction id must be filled' })
  @IsNumber()
  transaction_id: number;

  @Field(() => String)
  @IsNotEmpty({ message: 'User id must be filled' })
  @IsString({ message: 'User id must be a string' })
  user_id: string;
}
