import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  user_id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Date, { nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
