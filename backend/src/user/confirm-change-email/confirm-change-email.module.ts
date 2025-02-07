import { Module } from '@nestjs/common';
import { ConfirmChangeEmailService } from './confirm-change-email.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../../configs/jwt.config';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  providers: [PrismaService, ConfirmChangeEmailService],
  exports: [ConfirmChangeEmailService],
})
export class ConfirmChangeEmailModule {}
