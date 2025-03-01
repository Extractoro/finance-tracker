import { Field, InputType, Int } from '@nestjs/graphql';
import { CategoryType } from './category-type.enum';

@InputType()
export class EditCategoryInput {
  @Field(() => Int)
  category_id: number;

  @Field(() => String, { nullable: true })
  user_id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => CategoryType, { nullable: true })
  type?: CategoryType;
}
