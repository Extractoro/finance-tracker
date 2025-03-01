import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { PrismaService } from '../prisma.service';
import { CreateCategoryModule } from './create-category/create-category.module';
import { DeleteCategoryModule } from './delete-category/delete-category.module';
import { EditCategoryModule } from './edit-category/edit-category.module';

@Module({
  imports: [CreateCategoryModule, DeleteCategoryModule, EditCategoryModule],
  providers: [CategoryResolver, CategoryService, PrismaService],
})
export class CategoryModule {}
