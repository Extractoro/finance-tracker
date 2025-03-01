import { Module } from '@nestjs/common';
import { DeleteCategoryService } from './delete-category.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [PrismaService, DeleteCategoryService],
  exports: [DeleteCategoryService],
})
export class DeleteCategoryModule {}
