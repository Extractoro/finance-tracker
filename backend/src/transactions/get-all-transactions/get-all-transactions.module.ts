import { Module } from '@nestjs/common';
import { GetAllTransactionsService } from './get-all-transactions.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [PrismaService, GetAllTransactionsService],
  exports: [GetAllTransactionsService],
})
export class GetAllTransactionsModule {}
