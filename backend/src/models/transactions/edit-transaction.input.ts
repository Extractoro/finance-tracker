import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxDate,
  Min,
} from 'class-validator';
import { FinancialType } from '../enums/financial-type.enum';

@InputType()
export class EditTransactionInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'Transaction id must be filled' })
  @IsNumber()
  transaction_id: number;

  @Field(() => String)
  @IsNotEmpty({ message: 'User id must be filled' })
  @IsString({ message: 'User id must be a string' })
  user_id: string;

  @Field(() => FinancialType, { nullable: true })
  @IsOptional()
  type: FinancialType;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(1, { message: 'Amount must be greater than 0' })
  amount: number;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  @MaxDate(new Date(), { message: 'Date cannot be in the future' })
  date: Date;
}
