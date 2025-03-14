import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { FinancialType } from '../enums/financial-type.enum';

@ObjectType()
class Category {
  @Field(() => Int)
  category_id: number;

  @Field(() => String)
  name: string;
}

@ObjectType()
class Tag {
  @Field(() => Int)
  tag_id: number;

  @Field(() => String)
  name: string;
}

@ObjectType()
class TransactionCategory {
  @Field(() => Int)
  category_id: number;

  @Field(() => Category)
  category: Category;
}

@ObjectType()
class TransactionTag {
  @Field(() => Int)
  tag_id: number;

  @Field(() => Tag)
  tag: Tag;
}

@ObjectType()
export class TransactionsModel {
  @Field(() => Int)
  transaction_id: number;

  @Field(() => FinancialType, { nullable: true })
  type: FinancialType | null;

  @Field(() => String, { nullable: true })
  date: string | null;

  @Field(() => Float, { nullable: true })
  amount: number | null;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String)
  user_id: string;

  @Field(() => [TransactionCategory])
  transactions_category: TransactionCategory[];

  @Field(() => [TransactionTag])
  transactions_tags: TransactionTag[];
}
