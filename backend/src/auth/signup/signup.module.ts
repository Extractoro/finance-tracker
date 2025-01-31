import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { JwtModule } from '@nestjs/jwt';
import { UuidModule } from 'nestjs-uuid';
import { MailModule } from '../../mail/mail.module';
import { PrismaService } from '../../prisma.service';
import jwtConfig from '../../configs/jwt.config';

@Module({
  imports: [JwtModule.register(jwtConfig), UuidModule, MailModule],
  providers: [PrismaService, SignupService],
  exports: [SignupService],
})
export class SignupModule {}
