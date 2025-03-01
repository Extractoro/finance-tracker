import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { CreateCategoryInput } from '../models/category/create-category.input';
import { PrismaService } from '../prisma.service';
import { ApolloError } from 'apollo-server-express';
import { CreateCategoryResponse } from '../models/category/create-category.response';
import { CategoryType } from '../models/category/category-type.enum';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(
    @Args('data') args: CreateCategoryInput,
  ): Promise<CreateCategoryResponse> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const existedCategory = await this.prisma.category.findFirst({
          where: {
            name: args.name,
            type: args.type,
            OR: [{ user_id: args.user_id }, { user_id: null }],
          },
        });

        if (existedCategory)
          throw new ApolloError(
            'Category already exists',
            'CATEGORY_ALREADY_EXISTS',
          );

        const createdCategory = await prisma.category.create({
          data: args,
        });

        return {
          success: true,
          message: 'Category created successfully',
          category: {
            ...createdCategory,
            type: createdCategory.type as CategoryType,
          },
        };
      });
    } catch (error) {
      throw new ApolloError(
        error.message || 'Category creation failed',
        error.code || 'CATEGORY_CREATION_FAILED',
      );
    }
  }
}
