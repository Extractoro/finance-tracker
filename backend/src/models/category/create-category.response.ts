import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryModel } from './category.model';

@ObjectType()
export class CreateCategoryResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  errorCode?: string | null;

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel;
}
