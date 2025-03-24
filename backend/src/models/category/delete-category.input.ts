import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class DeleteCategoryInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'Category id must be filled' })
  @IsNumber()
  category_id: number;
}
