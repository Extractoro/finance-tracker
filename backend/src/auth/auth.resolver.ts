import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignupInput } from '../models/auth/signup.input';
import { ConfirmSignupResponse } from '../models/auth/confirm-signup.response';
import { SignupResponse } from '../models/auth/signup.response';
import { SignupService } from './signup/signup.service';
import { ConfirmSignupService } from './confirm-signup/confirm-signup.service';
import { SigninResponse } from '../models/auth/signin.response';
import { SigninInput } from '../models/auth/signin.input';
import { SigninService } from './signin/signin.service';
import { RefreshTokenResponse } from '../models/auth/refresh-token.response';
import { RefreshTokenInput } from '../models/auth/refresh-token.input';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly signupService: SignupService,
    private readonly signinService: SigninService,
    private readonly confirmSignupService: ConfirmSignupService,
    private readonly refreshTokenService: RefreshTokenService,
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

  @Mutation(() => SigninResponse)
  async signIn(@Args('data') args: SigninInput): Promise<SigninResponse> {
    return this.signinService.signIn(args);
  }

  @Mutation(() => RefreshTokenResponse)
  async refreshToken(
    @Args('data') data: RefreshTokenInput,
  ): Promise<RefreshTokenResponse> {
    return this.refreshTokenService.refreshToken(data);
  }
}
