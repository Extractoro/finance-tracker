import { Field, InputType } from '@nestjs/graphql';
import { CategoryType } from './category-type.enum';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsNotEmpty({ message: 'Category name must be filled' })
  @IsString({ message: 'Category name must be a string' })
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional() // Until release
  @IsString({ message: 'User id must be a string' })
  user_id?: string;

  @Field(() => CategoryType)
  @IsNotEmpty({ message: 'Category type must be filled' })
  type: CategoryType;
}
