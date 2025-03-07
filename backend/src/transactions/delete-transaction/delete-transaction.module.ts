import { Module } from '@nestjs/common';
import { DeleteTransactionService } from './delete-transaction.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [DeleteTransactionService, PrismaService],
  exports: [DeleteTransactionService],
})
export class DeleteTransactionModule {}
