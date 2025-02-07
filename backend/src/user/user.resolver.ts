import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from '../models/user/user.model';
import { UpdateUserInput } from '../models/user/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ConfirmChangeEmailResponse } from '../models/user/confirm-change-email.response';
import { ConfirmChangeEmailInput } from '../models/user/confirm-change-email.input';
import { ConfirmChangeEmailService } from './confirm-change-email/confirm-change-email.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly confirmChangeEmailService: ConfirmChangeEmailService,
  ) {}

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

  @UseGuards(AuthGuard)
  @Mutation(() => UserModel)
  async updateUser(@Args('data') data: UpdateUserInput) {
    return this.userService.updateUser(data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ConfirmChangeEmailResponse)
  async confirmChangeEmail(
    @Args('data') args: ConfirmChangeEmailInput,
  ): Promise<ConfirmChangeEmailResponse> {
    return this.confirmChangeEmailService.confirmChangeEmail(args);
  }
}
