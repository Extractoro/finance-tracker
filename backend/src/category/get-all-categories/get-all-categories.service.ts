import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { GetAllCategoriesResponse } from '../../models/category/get-all-categories.response';
import { FinancialType } from '../../models/enums/financial-type.enum';
import { JwtService } from '@nestjs/jwt';
import { ApolloError } from 'apollo-server-express';
import { Request } from 'express';
import { extractTokenFromCookies } from '../../utils/cookie';

@Injectable()
export class GetAllCategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getAllCategories(req: Request): Promise<GetAllCategoriesResponse> {
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

      const categories = await this.prisma.category.findMany({
        where: {
          OR: [{ user_id: decoded.sub }, { user_id: null }],
        },
      });

      const [userCategories, defaultCategories] = categories.reduce(
        ([user, defaults], category) => {
          const mappedCategory = {
            ...category,
            type: category.type as FinancialType,
          };
          return category.user_id
            ? [[...user, mappedCategory], defaults]
            : [user, [...defaults, mappedCategory]];
        },
        [[], []],
      );

      return {
        success: true,
        message: 'Categories returned successfully.',
        errorCode: null,
        userCategories,
        defaultCategories,
      };
    } catch (error) {
      throw new ApolloError(
        error.message || 'Category failed',
        error.extensions?.code || 'CATEGORY_EDITING_FAILED',
      );
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
