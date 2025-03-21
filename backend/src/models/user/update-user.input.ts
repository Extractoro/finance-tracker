import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  user_id: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(2, {
    message: 'Name must be more than 1 character.',
  })
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @MaxLength(128, {
    message: 'Email must be between 8 and 128 characters.',
  })
  email: string;

  @Field({ nullable: true })
  @IsOptional()
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
