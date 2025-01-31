import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignupInput } from '../models/auth/signup.input';
import { ConfirmSignupResponse } from '../models/auth/confirm-signup.model';
import { SignupResponse } from '../models/auth/signup-response.model';
import { SignupService } from './signup/signup.service';
import { ConfirmSignupService } from './confirm-signup/confirm-signup.service';

@Resolver()
export class AuthResolver {
  constructor(
    // private readonly authService: AuthService,
    private readonly signupService: SignupService,
    private readonly confirmSignupService: ConfirmSignupService,
  ) {}

  @Mutation(() => SignupResponse)
  async signUp(@Args('data') args: SignupInput): Promise<SignupResponse> {
    return this.signupService.signUp(args);
  }

  @Mutation(() => ConfirmSignupResponse)
  async confirmSignup(
    @Args('token') token: string,
  ): Promise<ConfirmSignupResponse> {
    return this.confirmSignupService.confirmSignup(token);
  }
}
