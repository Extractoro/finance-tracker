import { Field, ObjectType } from '@nestjs/graphql';
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
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
