import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { PrismaService } from '../../prisma.service';
import { EditTransactionInput } from '../../models/transactions/edit-transaction.input';
import { EditTransactionResponse } from '../../models/transactions/edit-transaction.response';
import { ApolloError } from 'apollo-server-express';
import { FinancialType } from '../../models/enums/financial-type.enum';
import hasChanges from '../../utils/hasChanges';

@Injectable()
export class EditTransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async editTransaction(
    @Args('data') args: EditTransactionInput,
  ): Promise<EditTransactionResponse> {
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

        const isChanged = hasChanges(args, existingTransaction);

        if (!isChanged) {
          return {
            success: true,
            message: 'Nothing to update',
            errorCode: null,
            transaction: {
              ...existingTransaction,
              type: existingTransaction.type as FinancialType,
              amount: existingTransaction.amount as number,
              date: existingTransaction.date ?? new Date(),
            },
          };
        }

        const editedTransaction = await prisma.transactions.update({
          data: args,
          where: { transaction_id: args.transaction_id, user_id: args.user_id },
        });

        return {
          success: true,
          message: 'Transaction edited',
          errorCode: null,
          transaction: {
            ...editedTransaction,
            type: editedTransaction.type as FinancialType,
            amount: editedTransaction.amount as number,
            date: editedTransaction.date ?? new Date(),
          },
        };
      });
    } catch (error) {
      throw new ApolloError(
        error.message || 'Transaction editing failed',
        error.extensions?.code || 'TRANSACTION_EDITING_FAILED',
      );
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
