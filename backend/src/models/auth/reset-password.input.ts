import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsNotEmpty({ message: 'Token must be filled' })
  token: string;

  @Field()
  @IsNotEmpty({ message: 'Password must be filled' })
  @IsString({ message: 'Password must be a string' })
  @Matches(/.*[$%&\-_!]+.*/, {
    message:
      'Password must contain at least one special character: $ % & - _ !',
  })
  @MinLength(8, {
    message: 'Password must be between 8 and 64 characters',
  })
  @MaxLength(64, {
    message: 'Password must be between 8 and 64 characters',
  })
  password: string;
}
