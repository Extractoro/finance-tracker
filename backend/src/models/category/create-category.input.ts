import { Field, InputType } from '@nestjs/graphql';
import { CategoryType } from './category-type.enum';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  user_id?: string;

  @Field(() => CategoryType)
  type: CategoryType;
}
