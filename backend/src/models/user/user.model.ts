import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@ObjectType()
export class UserModel {
  @Field()
  user_id: string;

  @Field()
  @MinLength(2)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field(() => Date, { nullable: true })
  created_at: Date | null;

  @Field(() => Date, { nullable: true })
  updated_at: Date | null;

  @Field(() => Int)
  verify: number;

  @Field(() => String, { nullable: true })
  refresh_token?: string | null;
}
