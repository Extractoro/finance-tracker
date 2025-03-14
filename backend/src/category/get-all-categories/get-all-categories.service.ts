import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { GetAllCategoriesResponse } from '../../models/category/get-all-categories.response';
import { FinancialType } from '../../models/enums/financial-type.enum';

@Injectable()
export class GetAllCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories(): Promise<GetAllCategoriesResponse> {
    const categories = await this.prisma.category.findMany();

    const mappedCategories = categories.map((category) => ({
      ...category,
      type: category.type as FinancialType,
    }));

    return {
      success: true,
      message: 'Categories returned successfully.',
      errorCode: null,
      categories: mappedCategories,
    };
  }
}
