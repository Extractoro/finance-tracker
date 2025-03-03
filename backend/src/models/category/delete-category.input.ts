import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class DeleteCategoryInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'Category id must be filled' })
  @IsNumber()
  category_id: number;

  @Field(() => String, { nullable: true })
  @IsOptional() // Until release
  @IsString({ message: 'User id must be a string' })
  user_id?: string;
}
