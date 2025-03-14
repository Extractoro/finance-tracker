import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { PrismaService } from '../prisma.service';
import { CreateCategoryModule } from './create-category/create-category.module';
import { DeleteCategoryModule } from './delete-category/delete-category.module';
import { EditCategoryModule } from './edit-category/edit-category.module';
import { GetAllCategoriesModule } from './get-all-categories/get-all-categories.module';

@Module({
  imports: [CreateCategoryModule, DeleteCategoryModule, EditCategoryModule, GetAllCategoriesModule],
  providers: [CategoryResolver, CategoryService, PrismaService],
})
export class CategoryModule {}
