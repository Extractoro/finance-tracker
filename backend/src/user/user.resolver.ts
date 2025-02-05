import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from '../models/user/user.model';
import { UpdateUserInput } from '../models/user/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query(() => [UserModel])
  async findAllUsers(): Promise<UserModel[]> {
    return this.userService.findAllUsers();
  }

  @UseGuards(AuthGuard)
  @Query(() => UserModel)
  async findById(@Args('id') id: string): Promise<UserModel> {
    return this.userService.findById(id);
  }

  @Mutation(() => UserModel)
  async updateUser(@Args('data') data: UpdateUserInput) {
    return this.userService.updateUser(data);
  }
}
