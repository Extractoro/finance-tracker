import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ConfirmSignupInput {
  @Field()
  @IsNotEmpty()
  token: string;
}
