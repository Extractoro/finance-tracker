import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './user.model';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel], { name: 'user' })
  findAllUsers() {
    return this.userService.findAllUsers();
  }
}
