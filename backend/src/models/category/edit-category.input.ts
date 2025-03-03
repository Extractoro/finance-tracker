import { Field, InputType, Int } from '@nestjs/graphql';
import { CategoryType } from './category-type.enum';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class EditCategoryInput {
  @Field(() => Int)
  category_id: number;

  @Field(() => String, { nullable: true })
  @IsOptional() // Until release
  @IsString({ message: 'User id must be a string' })
  user_id?: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty({ message: 'Category name must be filled' })
  @IsString({ message: 'Category name must be a string' })
  name?: string;

  @Field(() => CategoryType, { nullable: true })
  @IsNotEmpty({ message: 'Category type must be filled' })
  type?: CategoryType;
}
