import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Args } from '@nestjs/graphql';
import { CreateCategoryInput } from '../../models/category/create-category.input';
import { CreateCategoryResponse } from '../../models/category/create-category.response';
import { ApolloError } from 'apollo-server-express';
import { CategoryModel } from '../../models/category/category.model';
import { FinancialType } from '../../models/enums/financial-type.enum';
import { Request } from 'express';
import { extractTokenFromCookies } from '../../utils/cookie';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CreateCategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createCategory(
    @Args('data') args: CreateCategoryInput,
    req: Request,
  ): Promise<CreateCategoryResponse> {
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

        const existedCategory = (await prisma.category.findFirst({
          where: {
            name: args.name,
            type: args.type as FinancialType,
            OR: [{ user_id: decoded.sub }, { user_id: null }],
          },
        })) as CategoryModel | null;

        if (existedCategory)
          throw new ApolloError(
            'Category already exists',
            'CATEGORY_ALREADY_EXISTS',
          );

        const createdCategory = await prisma.category.create({
          data: { ...args, user_id: decoded.sub },
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
