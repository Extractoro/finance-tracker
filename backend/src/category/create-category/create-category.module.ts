import { Module } from '@nestjs/common';
import { CreateCategoryService } from './create-category.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [PrismaService, CreateCategoryService],
  exports: [CreateCategoryService],
})
export class CreateCategoryModule {}
