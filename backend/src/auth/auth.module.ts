import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UuidModule } from 'nestjs-uuid';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UuidModule,
    MailModule,
  ],
  providers: [PrismaService, AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
