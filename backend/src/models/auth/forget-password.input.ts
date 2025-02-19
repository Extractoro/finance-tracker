import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class ForgetPasswordInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
