import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteCategoryInput {
  @Field(() => Int)
  category_id: number;

  @Field(() => String, { nullable: true })
  user_id?: string;
}
