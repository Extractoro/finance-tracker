import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from '../models/category/create-category.input';
import { CreateCategoryResponse } from '../models/category/create-category.response';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CreateCategoryResponse)
  async createCategory(
    @Args('data') args: CreateCategoryInput,
  ): Promise<CreateCategoryResponse> {
    return await this.categoryService.createCategory(args);
  }
}
