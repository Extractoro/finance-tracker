import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SignupInput } from '../models/auth/signup.input';
import { ConfirmSignupResponse } from '../models/auth/confirm-signup.response';
import { SignupResponse } from '../models/auth/signup.response';
import { SignupService } from './signup/signup.service';
import { ConfirmSignupService } from './confirm-signup/confirm-signup.service';
import { SigninResponse } from '../models/auth/signin.response';
import { SigninInput } from '../models/auth/signin.input';
import { SigninService } from './signin/signin.service';
import { RefreshTokenResponse } from '../models/auth/refresh-token.response';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { ConfirmSignupInput } from '../models/auth/confirm-signup.input';
import { ForgetPasswordInput } from '../models/auth/forget-password.input';
import { ForgetPasswordResponse } from '../models/auth/forget-password.response';
import { ForgetPasswordService } from './forget-password/forget-password.service';
import { ResetPasswordResponse } from '../models/auth/reset-password.response';
import { ResetPasswordInput } from '../models/auth/reset-password.input';
import { ResetPasswordService } from './reset-password/reset-password.service';
import { ResendConfirmService } from './resend-confirm/resend-confirm.service';
import { ResendConfirmInput } from '../models/auth/resend-confirm.input';
import { ResendConfirmResponse } from '../models/auth/resend-confirm.response';
import { Request, Response } from 'express';

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
    private readonly resendConfirmService: ResendConfirmService,
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
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<RefreshTokenResponse> {
    const refreshTokenResponse =
      await this.refreshTokenService.refreshToken(req);

    res.cookie('accessToken', refreshTokenResponse.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 3 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshTokenResponse.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    return refreshTokenResponse;
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

  @Mutation(() => ResendConfirmResponse)
  async resendConfirm(
    @Args('data') args: ResendConfirmInput,
  ): Promise<ResendConfirmResponse> {
    return this.resendConfirmService.resendConfirm(args);
  }
}
