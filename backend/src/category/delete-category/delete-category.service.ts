import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Args } from '@nestjs/graphql';
import { DeleteCategoryResponse } from '../../models/category/delete-category.response';
import { DeleteCategoryInput } from '../../models/category/delete-category.input';
import { ApolloError } from 'apollo-server-express';
import { CategoryModel } from '../../models/category/category.model';

@Injectable()
export class DeleteCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteCategory(
    @Args('data') args: DeleteCategoryInput,
  ): Promise<DeleteCategoryResponse> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const existingCategory = (await prisma.category.findFirst({
          where: {
            category_id: args.category_id,
            OR: [{ user_id: args.user_id }, { user_id: null }],
          },
        })) as CategoryModel | null;

        if (!existingCategory) {
          throw new ApolloError(
            'Category not found or not permitted for deletion',
            'CATEGORY_NOT_FOUND_OR_PERMITTED',
          );
        }

        await prisma.category.delete({
          where: {
            category_id: args.category_id,
          },
        });

        return {
          success: true,
          message: 'Category deleted successfully',
          errorCode: null,
        };
      });
    } catch (error) {
      throw new ApolloError(
        error.message || 'Category deleting failed',
        error.extensions?.code || 'CATEGORY_DELETING_FAILED',
      );
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
