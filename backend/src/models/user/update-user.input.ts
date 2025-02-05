import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  user_id: string;

  @Field({ nullable: true })
  @MinLength(2)
  name: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @MinLength(8)
  password: string;
}
