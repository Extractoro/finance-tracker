import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTransactionInput } from '../../models/transactions/create-transaction.input';
import { Args } from '@nestjs/graphql';
import { CreateTransactionResponse } from '../../models/transactions/create-transaction.response';
import { ApolloError } from 'apollo-server-express';
import { FinancialType } from '../../models/enums/financial-type.enum';

@Injectable()
export class CreateTransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(
    @Args('data') args: CreateTransactionInput,
  ): Promise<CreateTransactionResponse> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const existedUser = await prisma.users.findUnique({
          where: { user_id: args.user_id },
        });

        if (!existedUser)
          throw new ApolloError('User not found', 'USER_NOT_FOUND');

        const existedCategory = await prisma.category.findUnique({
          where: { category_id: args.category_id },
        });

        if (!existedCategory)
          throw new ApolloError('Category not found', 'CATEGORY_NOT_FOUND');

        const createdTransaction = await prisma.transactions.create({
          data: args,
        });

        if (!createdTransaction)
          throw new ApolloError(
            'Error creating transaction',
            'ERROR_CREATING_TRANSACTION',
          );

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
      });
    } catch (error) {
      throw new ApolloError(
        error.message || 'Transaction creating failed',
        error.extensions?.code || 'TRANSACTION_CREATING_FAILED',
      );
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
