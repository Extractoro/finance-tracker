import { Module } from '@nestjs/common';
import { EditTransactionService } from './edit-transaction.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [EditTransactionService, PrismaService],
  exports: [EditTransactionService],
})
export class EditTransactionModule {}
