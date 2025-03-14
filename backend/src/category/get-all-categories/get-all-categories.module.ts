import { Module } from '@nestjs/common';
import { GetAllCategoriesService } from './get-all-categories.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [PrismaService, GetAllCategoriesService],
  exports: [GetAllCategoriesService],
})
export class GetAllCategoriesModule {}
