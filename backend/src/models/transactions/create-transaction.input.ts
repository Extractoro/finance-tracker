import { Field, Float, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { FinancialType } from '../enums/financial-type.enum';

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'User id must be filled' })
  @IsString({ message: 'User id must be a string' })
  user_id: string;

  @Field(() => FinancialType)
  @IsNotEmpty({ message: 'Financial type must be filled' })
  type: FinancialType;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty({ message: 'Amount must be filled' })
  amount: number;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'Date must be filled' })
  date: Date;
}
