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
import { ConfirmSignupInput } from '../models/auth/confirm-signup.input';
import { ForgetPasswordInput } from '../models/auth/forget-password.input';
import { ForgetPasswordResponse } from '../models/auth/forget-password.response';
import { ForgetPasswordService } from './forget-password/forget-password.service';
import { ResetPasswordResponse } from '../models/auth/reset-password.response';
import { ResetPasswordInput } from '../models/auth/reset-password.input';
import { ResetPasswordService } from './reset-password/reset-password.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly signupService: SignupService,
    private readonly signinService: SigninService,
    private readonly confirmSignupService: ConfirmSignupService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly forgetPasswordService: ForgetPasswordService,
    private readonly resetPasswordService: ResetPasswordService,
  ) {}

  @Mutation(() => SignupResponse)
  async signUp(@Args('data') args: SignupInput): Promise<SignupResponse> {
    return this.signupService.signUp(args);
  }

  @Mutation(() => ConfirmSignupResponse)
  async confirmSignup(
    @Args('data') args: ConfirmSignupInput,
  ): Promise<ConfirmSignupResponse> {
    return this.confirmSignupService.confirmSignup(args);
  }

  @Mutation(() => SigninResponse)
  async signIn(@Args('data') args: SigninInput): Promise<SigninResponse> {
    return this.signinService.signIn(args);
  }

  @Mutation(() => RefreshTokenResponse)
  async refreshToken(
    @Args('data') args: RefreshTokenInput,
  ): Promise<RefreshTokenResponse> {
    return this.refreshTokenService.refreshToken(args);
  }

  @Mutation(() => ForgetPasswordResponse)
  async forgetPassword(
    @Args('data') args: ForgetPasswordInput,
  ): Promise<ForgetPasswordResponse> {
    return this.forgetPasswordService.forgetPassword(args);
  }

  @Mutation(() => ResetPasswordResponse)
  async resetPassword(
    @Args('data') args: ResetPasswordInput,
  ): Promise<ResetPasswordResponse> {
    return this.resetPasswordService.resetPassword(args);
  }
}
