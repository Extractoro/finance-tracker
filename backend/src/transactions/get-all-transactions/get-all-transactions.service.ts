import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { GetAllTransactionsResponse } from '../../models/transactions/get-all-transactions.response';
import { FinancialType } from '../../models/enums/financial-type.enum';

@Injectable()
export class GetAllTransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTransactions(): Promise<GetAllTransactionsResponse> {
    const transactions = await this.prisma.transactions.findMany({
      where: {
        type: {
          not: null,
        },
        date: {
          not: null,
        },
      },
      include: {
        transactions_category: {
          include: {
            category: true,
          },
        },
        transactions_tags: {
          include: {
            tags: true,
          },
        },
      },
    });

    const mappedTransactions = transactions.map((transaction) => ({
      ...transaction,
      type: transaction.type as FinancialType,
      date: transaction.date ? transaction.date.toISOString() : null,
      transactions_tags: transaction.transactions_tags.map((tag) => ({
        tag_id: tag.tag_id,
        tag: {
          tag_id: tag.tags.tag_id,
          name: tag.tags.name,
        },
      })),
    }));

    return {
      success: true,
      errorCode: null,
      message: 'All transactions successfully returned',
      transactions: mappedTransactions,
    };
  }
}
