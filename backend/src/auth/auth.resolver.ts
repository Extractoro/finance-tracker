import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserModel } from '../models/user/user.model';
import { SignupInput } from '../models/auth/signup.input';
import { ConfirmSignupResponse } from '../models/auth/confirm-signup.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserModel)
  async signUp(@Args('data') args: SignupInput): Promise<UserModel> {
    return this.authService.signUp(args);
  }

  @Mutation(() => ConfirmSignupResponse)
  async confirmSignup(
    @Args('token') token: string,
  ): Promise<ConfirmSignupResponse> {
    try {
      await this.authService.confirmSignup(token);
      return {
        success: true,
        message: 'User confirmed successfully',
        errorCode: null,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
        errorCode: err?.extensions?.code || 'UNKNOWN_ERROR',
      };
    }
  }
}
