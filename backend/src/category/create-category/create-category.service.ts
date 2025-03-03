import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Args } from '@nestjs/graphql';
import { CreateCategoryInput } from '../../models/category/create-category.input';
import { CreateCategoryResponse } from '../../models/category/create-category.response';
import { ApolloError } from 'apollo-server-express';
import { CategoryModel } from '../../models/category/category.model';
import { FinancialType } from '../../models/enums/financial-type.enum';

@Injectable()
export class CreateCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(
    @Args('data') args: CreateCategoryInput,
  ): Promise<CreateCategoryResponse> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        // const existedUser = args.user_id
        //   ? await prisma.users.findUnique({
        //       where: {
        //         user_id: args.user_id,
        //       },
        //     })
        //   : null;

        // if (!existedUser)
        //   throw new ApolloError('User do not exist', 'USER_DONT_EXIST');

        const existedCategory = (await prisma.category.findFirst({
          where: {
            name: args.name,
            type: args.type as FinancialType,
            OR: [{ user_id: args.user_id }, { user_id: null }],
          },
        })) as CategoryModel | null;

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
            type: createdCategory.type as FinancialType,
          },
        };
      });
    } catch (error) {
      throw new ApolloError(
        error.message || 'Category creation failed',
        error.extensions?.code || 'CATEGORY_CREATION_FAILED',
      );
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
