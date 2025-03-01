import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryType } from './category-type.enum';

@ObjectType()
export class CategoryModel {
  @Field(() => Int)
  category_id: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  user_id?: string | null;

  @Field(() => CategoryType)
  type: CategoryType;
}
