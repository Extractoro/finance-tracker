import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../../configs/jwt.config';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  providers: [PrismaService, ResetPasswordService],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
