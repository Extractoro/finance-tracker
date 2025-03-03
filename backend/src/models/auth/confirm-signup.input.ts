import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ConfirmSignupInput {
  @Field()
  @IsNotEmpty({ message: 'Token must be filled' })
  @IsString({ message: 'Token must be a string' })
  token: string;
}
