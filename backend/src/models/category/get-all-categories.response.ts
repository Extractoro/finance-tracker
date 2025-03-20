import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryModel } from './category.model';

@ObjectType()
export class GetAllCategoriesResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  errorCode?: string | null;

  @Field(() => [CategoryModel])
  userCategories: CategoryModel[];

  @Field(() => [CategoryModel])
  defaultCategories: CategoryModel[];
}
