import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Args } from '@nestjs/graphql';
import { DeleteCategoryResponse } from '../../models/category/delete-category.response';
import { DeleteCategoryInput } from '../../models/category/delete-category.input';
import { ApolloError } from 'apollo-server-express';
import { CategoryModel } from '../../models/category/category.model';
import { Request } from 'express';
import { extractTokenFromCookies } from '../../utils/cookie';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DeleteCategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async deleteCategory(
    @Args('data') args: DeleteCategoryInput,
    req: Request,
  ): Promise<DeleteCategoryResponse> {
    try {
      const cookieHeader = req.headers.cookie;
      if (!cookieHeader) {
        throw new ApolloError('No cookies found', 'NO_COOKIE_HEADER');
      }

      const accessToken = extractTokenFromCookies(cookieHeader, 'accessToken');
      if (!accessToken) {
        throw new ApolloError('No access token found', 'NO_ACCESS_TOKEN');
      }

      const decoded = this.jwtService.decode(accessToken) as { sub: string };
      if (!decoded || !decoded.sub) {
        throw new ApolloError('Invalid token', 'TOKEN_INVALID');
      }

      return await this.prisma.$transaction(async (prisma) => {
        const existingCategory = (await prisma.category.findFirst({
          where: {
            category_id: args.category_id,
            OR: [{ user_id: decoded.sub }, { user_id: null }],
          },
        })) as CategoryModel | null;

        if (!existingCategory) {
          throw new ApolloError(
            'Category not found or not permitted for deletion',
            'CATEGORY_NOT_FOUND_OR_PERMITTED',
          );
        }

        const usedCategory = await prisma.transactions_category.findMany({
          where: {
            category_id: existingCategory.category_id,
          },
        });

        if (usedCategory.length > 0) {
          throw new ApolloError(
            'Category used in transactions',
            'CATEGORY_USED_IN_TRANSACTIONS',
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
