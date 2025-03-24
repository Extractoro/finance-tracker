import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { GetAllCategoriesResponse } from '../models/category/get-all-categories.response';
import { GetAllCategoriesService } from './get-all-categories/get-all-categories.service';
import { Request } from 'express';

@Resolver()
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly getAllCategoriesService: GetAllCategoriesService,
    private readonly createCategoryService: CreateCategoryService,
    private readonly deleteCategoryService: DeleteCategoryService,
    private readonly editCategoryService: EditCategoryService,
  ) {}

  @Query(() => GetAllCategoriesResponse)
  async getAllCategories(
    @Context('req') req: Request,
  ): Promise<GetAllCategoriesResponse> {
    return await this.getAllCategoriesService.getAllCategories(req);
  }

  @Mutation(() => CreateCategoryResponse)
  async createCategory(
    @Args('data') args: CreateCategoryInput,
    @Context('req') req: Request,
  ): Promise<CreateCategoryResponse> {
    return await this.createCategoryService.createCategory(args, req);
  }

  @Mutation(() => EditCategoryResponse)
  async editCategory(
    @Args('data') args: EditCategoryInput,
    @Context('req') req: Request,
  ): Promise<EditCategoryResponse> {
    return await this.editCategoryService.editCategory(args, req);
  }

  @Mutation(() => DeleteCategoryResponse)
  async deleteCategory(
    @Args('data') args: DeleteCategoryInput,
    @Context('req') req: Request,
  ): Promise<DeleteCategoryResponse> {
    return await this.deleteCategoryService.deleteCategory(args, req);
  }
}
