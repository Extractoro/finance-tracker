import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { EditCategoryInput } from '../../models/category/edit-category.input';
import { Args } from '@nestjs/graphql';
import { EditCategoryResponse } from '../../models/category/edit-category.response';
import { ApolloError } from 'apollo-server-express';
import { CategoryModel } from '../../models/category/category.model';
import hasChanges from '../../utils/hasChanges';
import { FinancialType } from '../../models/enums/financial-type.enum';

@Injectable()
export class EditCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async editCategory(
    @Args('data') args: EditCategoryInput,
  ): Promise<EditCategoryResponse> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const existedCategory = (await prisma.category.findUnique({
          where: {
            category_id: args.category_id,
            user_id: args.user_id,
          },
        })) as CategoryModel | null;

        if (!existedCategory)
          throw new ApolloError(
            'Category not found or not permitted for edit category',
            'CATEGORY_NOT_FOUND_OR_PERMITTED',
          );

        const isChanged = hasChanges(args, existedCategory);

        if (!isChanged) {
          return {
            success: true,
            message: 'Nothing to update',
            errorCode: null,
            category: {
              ...existedCategory,
            },
          };
        }

        const editedCategory = await prisma.category.update({
          data: {
            name: args.name,
            type: args.type,
          },
          where: {
            category_id: args.category_id,
          },
        });

        return {
          success: true,
          errorCode: null,
          message: 'Category successfully updated',
          category: {
            ...editedCategory,
            type: editedCategory.type as FinancialType,
          },
        };
      });
    } catch (error) {
      throw new ApolloError(
        error.message || 'Category editing failed',
        error.extensions?.code || 'CATEGORY_EDITING_FAILED',
      );
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
