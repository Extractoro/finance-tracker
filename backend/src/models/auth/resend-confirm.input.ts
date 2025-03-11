import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class ResendConfirmInput {
  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'Email must be filled' })
  @MaxLength(128, {
    message: 'Email must be between 8 and 128 characters.',
  })
  email: string;
}
