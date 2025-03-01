import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from '../models/category/create-category.input';
import { CreateCategoryResponse } from '../models/category/create-category.response';
import { CreateCategoryService } from './create-category/create-category.service';
import { DeleteCategoryResponse } from '../models/category/delete-category.response';
import { DeleteCategoryInput } from '../models/category/delete-category.input';
import { DeleteCategoryService } from './delete-category/delete-category.service';

@Resolver()
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly createCategoryService: CreateCategoryService,
    private readonly deleteCategoryService: DeleteCategoryService,
  ) {}

  @Mutation(() => CreateCategoryResponse)
  async createCategory(
    @Args('data') args: CreateCategoryInput,
  ): Promise<CreateCategoryResponse> {
    return await this.createCategoryService.createCategory(args);
  }

  @Mutation(() => DeleteCategoryResponse)
  async deleteCategory(
    @Args('data') args: DeleteCategoryInput,
  ): Promise<DeleteCategoryResponse> {
    return await this.deleteCategoryService.deleteCategory(args);
  }
}
