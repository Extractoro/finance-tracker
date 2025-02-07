import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ConfirmChangeEmailInput {
  @Field()
  @IsNotEmpty()
  token: string;
}
