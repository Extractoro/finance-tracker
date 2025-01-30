import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserModel } from '../models/user/user.model';
import { SignupInput } from '../models/auth/signup.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserModel)
  async signUp(@Args('data') args: SignupInput) {
    return this.authService.signUp(args);
  }
}
