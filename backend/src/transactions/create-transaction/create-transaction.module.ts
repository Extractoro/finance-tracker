import { Module } from '@nestjs/common';
import { CreateTransactionService } from './create-transaction.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [PrismaService, CreateTransactionService],
  exports: [CreateTransactionService],
})
export class CreateTransactionModule {}
