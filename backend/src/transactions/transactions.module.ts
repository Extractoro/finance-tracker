import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { CreateTransactionModule } from './create-transaction/create-transaction.module';
import { CreateTransactionService } from './create-transaction/create-transaction.service';
import { PrismaService } from '../prisma.service';
import { EditTransactionModule } from './edit-transaction/edit-transaction.module';
import { DeleteTransactionModule } from './delete-transaction/delete-transaction.module';

@Module({
  providers: [
    PrismaService,
    TransactionsResolver,
    TransactionsService,
    CreateTransactionService,
  ],
  imports: [CreateTransactionModule, EditTransactionModule, DeleteTransactionModule],
})
export class TransactionsModule {}
