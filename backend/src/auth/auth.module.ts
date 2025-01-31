import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UuidModule } from 'nestjs-uuid';
import { MailModule } from '../mail/mail.module';
import { SignupModule } from './signup/signup.module';
import { ConfirmSignupModule } from './confirm-signup/confirm-signup.module';
import jwtConfig from '../configs/jwt.config';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    UuidModule,
    MailModule,
    SignupModule,
    ConfirmSignupModule,
  ],
  providers: [PrismaService, AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
