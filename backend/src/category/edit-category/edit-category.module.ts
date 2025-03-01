import { Module } from '@nestjs/common';
import { EditCategoryService } from './edit-category.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [PrismaService, EditCategoryService],
  exports: [EditCategoryService],
})
export class EditCategoryModule {}
