import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { CreateTransactionService } from './create-transaction/create-transaction.service';
import { CreateTransactionResponse } from '../models/transactions/create-transaction.response';
import { CreateTransactionInput } from '../models/transactions/create-transaction.input';

@Resolver()
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly createTransactionService: CreateTransactionService,
  ) {}

  @Mutation(() => CreateTransactionResponse)
  async createTransaction(
    @Args('data') args: CreateTransactionInput,
  ): Promise<CreateTransactionResponse> {
    return this.createTransactionService.createTransaction(args);
  }
}
