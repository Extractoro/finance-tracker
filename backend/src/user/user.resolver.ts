import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from '../models/user/user.model';
import { UpdateUserInput } from '../models/user/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel], { name: 'user' })
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Mutation(() => UserModel)
  async updateUser(@Args('data') data: UpdateUserInput) {
    return this.userService.updateUser(data);
  }
}
