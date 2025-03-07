import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { DeleteTransactionInput } from '../../models/transactions/delete-transaction.input';
import { DeleteTransactionResponse } from '../../models/transactions/delete-transaction.response';
import { Args } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class DeleteTransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteTransaction(
    @Args('data') args: DeleteTransactionInput,
  ): Promise<DeleteTransactionResponse> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const existingTransaction = await prisma.transactions.findUnique({
          where: { transaction_id: args.transaction_id, user_id: args.user_id },
        });

        if (!existingTransaction) {
          throw new ApolloError(
            'Transaction not found',
            'TRANSACTION_NOT_FOUND',
          );
        }

        await prisma.transactions_tags.deleteMany({
          where: { transaction_id: args.transaction_id },
        });

        await prisma.transactions_category.deleteMany({
          where: { transaction_id: args.transaction_id },
        });

        await prisma.transactions.delete({
          where: { transaction_id: args.transaction_id, user_id: args.user_id },
        });

        return {
          success: true,
          errorCode: null,
          message: 'Deleting transaction successfully',
        };
      });
    } catch (error) {
      throw new ApolloError(
        error.message || 'Transaction deleting failed',
        error.extensions?.code || 'TRANSACTION_DELETING_FAILED',
      );
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
