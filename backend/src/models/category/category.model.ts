import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FinancialType } from '../enums/financial-type.enum';

@ObjectType()
export class CategoryModel {
  @Field(() => Int)
  category_id: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  user_id?: string | null; // Until release

  @Field(() => FinancialType)
  type: FinancialType;

  @Field(() => Date, { nullable: true })
  created_at: Date | null;

  @Field(() => Date, { nullable: true })
  updated_at: Date | null;
}
