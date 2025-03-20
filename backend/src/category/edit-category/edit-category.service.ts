import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { EditCategoryInput } from '../../models/category/edit-category.input';
import { Args } from '@nestjs/graphql';
import { EditCategoryResponse } from '../../models/category/edit-category.response';
import { ApolloError } from 'apollo-server-express';
import { CategoryModel } from '../../models/category/category.model';
import hasChanges from '../../utils/hasChanges';
import { FinancialType } from '../../models/enums/financial-type.enum';
import { extractTokenFromCookies } from '../../utils/cookie';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EditCategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async editCategory(
    @Args('data') args: EditCategoryInput,
    req: Request,
  ): Promise<EditCategoryResponse> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const cookieHeader = req.headers.cookie;
        if (!cookieHeader) {
          throw new ApolloError('No cookies found', 'NO_COOKIE_HEADER');
        }

        const accessToken = extractTokenFromCookies(
          cookieHeader,
          'accessToken',
        );
        if (!accessToken) {
          throw new ApolloError('No access token found', 'NO_ACCESS_TOKEN');
        }

        const decoded = this.jwtService.decode(accessToken) as { sub: string };
        if (!decoded || !decoded.sub) {
          throw new ApolloError('Invalid token', 'TOKEN_INVALID');
        }

        const existedCategory = (await prisma.category.findUnique({
          where: {
            category_id: args.category_id,
            user_id: decoded.sub,
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
            user_id: decoded.sub,
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
