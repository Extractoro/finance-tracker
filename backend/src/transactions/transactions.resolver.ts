import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { CreateTransactionService } from './create-transaction/create-transaction.service';
import { CreateTransactionResponse } from '../models/transactions/create-transaction.response';
import { CreateTransactionInput } from '../models/transactions/create-transaction.input';
import { EditTransactionService } from './edit-transaction/edit-transaction.service';
import { EditTransactionInput } from '../models/transactions/edit-transaction.input';
import { EditTransactionResponse } from '../models/transactions/edit-transaction.response';
import { DeleteTransactionResponse } from '../models/transactions/delete-transaction.response';
import { DeleteTransactionInput } from '../models/transactions/delete-transaction.input';
import { DeleteTransactionService } from './delete-transaction/delete-transaction.service';
import { GetAllTransactionsService } from './get-all-transactions/get-all-transactions.service';
import { GetAllResponse } from '../models/transactions/get-all.response';

@Resolver()
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly getAllTransactionsService: GetAllTransactionsService,
    private readonly createTransactionService: CreateTransactionService,
    private readonly editTransactionService: EditTransactionService,
    private readonly deleteTransactionService: DeleteTransactionService,
  ) {}

  @Query(() => GetAllResponse)
  async getAll(): Promise<GetAllResponse> {
    return await this.getAllTransactionsService.getAllTransactions();
  }

  @Mutation(() => CreateTransactionResponse)
  async createTransaction(
    @Args('data') args: CreateTransactionInput,
  ): Promise<CreateTransactionResponse> {
    return await this.createTransactionService.createTransaction(args);
  }

  @Mutation(() => EditTransactionResponse)
  async editTransaction(
    @Args('data') args: EditTransactionInput,
  ): Promise<EditTransactionResponse> {
    return await this.editTransactionService.editTransaction(args);
  }

  @Mutation(() => DeleteTransactionResponse)
  async deleteTransaction(
    @Args('data') args: DeleteTransactionInput,
  ): Promise<DeleteTransactionResponse> {
    return await this.deleteTransactionService.deleteTransaction(args);
  }
}
