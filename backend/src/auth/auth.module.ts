import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UuidModule } from 'nestjs-uuid';
import { MailModule } from '../mail/mail.module';
import { SignupModule } from './signup/signup.module';
import { ConfirmSignupModule } from './confirm-signup/confirm-signup.module';
import { SigninModule } from './signin/signin.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { ForgetPasswordModule } from './forget-password/forget-password.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { GoogleOauthModule } from './google-oauth/google-oauth.module';
import jwtConfig from '../configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { ResendConfirmModule } from './resend-confirm/resend-confirm.module';
import passportConfig from '../configs/passport.config';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    PassportModule.register(passportConfig),
    UuidModule,
    MailModule,
    SignupModule,
    ConfirmSignupModule,
    SigninModule,
    RefreshTokenModule,
    ForgetPasswordModule,
    ResetPasswordModule,
    GoogleOauthModule,
    ResendConfirmModule,
  ],
  providers: [
    PrismaService,
    AuthResolver,
    AuthService,
    JwtStrategy,
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
