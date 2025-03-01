import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from '../models/category/create-category.input';
import { CreateCategoryResponse } from '../models/category/create-category.response';
import { CreateCategoryService } from './create-category/create-category.service';
import { DeleteCategoryResponse } from '../models/category/delete-category.response';
import { DeleteCategoryInput } from '../models/category/delete-category.input';
import { DeleteCategoryService } from './delete-category/delete-category.service';
import { EditCategoryService } from './edit-category/edit-category.service';
import { EditCategoryInput } from '../models/category/edit-category.input';
import { EditCategoryResponse } from '../models/category/edit-category.response';

@Resolver()
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly createCategoryService: CreateCategoryService,
    private readonly deleteCategoryService: DeleteCategoryService,
    private readonly editCategoryService: EditCategoryService,
  ) {}

  @Mutation(() => CreateCategoryResponse)
  async createCategory(
    @Args('data') args: CreateCategoryInput,
  ): Promise<CreateCategoryResponse> {
    return await this.createCategoryService.createCategory(args);
  }

  @Mutation(() => EditCategoryResponse)
  async editCategory(
    @Args('data') args: EditCategoryInput,
  ): Promise<EditCategoryResponse> {
    return await this.editCategoryService.editCategory(args);
  }

  @Mutation(() => DeleteCategoryResponse)
  async deleteCategory(
    @Args('data') args: DeleteCategoryInput,
  ): Promise<DeleteCategoryResponse> {
    return await this.deleteCategoryService.deleteCategory(args);
  }
}
