import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTransactionInput } from '../../models/transactions/create-transaction.input';
import { Args } from '@nestjs/graphql';
import { CreateTransactionResponse } from '../../models/transactions/create-transaction.response';
import { FinancialType } from '../../models/enums/financial-type.enum';

@Injectable()
export class CreateTransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(
    @Args('data') args: CreateTransactionInput,
  ): Promise<CreateTransactionResponse> {
    const createdTransaction = await this.prisma.transactions.create({
      data: args,
    });
    // Date correct check
    return {
      success: true,
      message: 'Transaction created',
      errorCode: null,
      transaction: {
        ...createdTransaction,
        type: createdTransaction.type as FinancialType,
        amount: createdTransaction.amount as number,
        date: createdTransaction.date ?? new Date(),
      },
    };
  }
}
