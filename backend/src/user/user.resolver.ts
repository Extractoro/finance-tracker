import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from '../models/user/user.model';
import { CreateUserInput } from '../models/user/create-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel], { name: 'user' })
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Mutation(() => UserModel)
  async createUser(@Args('data') data: CreateUserInput) {
    return this.userService.createUser(data);
  }
}
