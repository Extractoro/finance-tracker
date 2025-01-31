import { Module } from '@nestjs/common';
import { ConfirmSignupService } from './confirm-signup.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../../configs/jwt.config';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  providers: [PrismaService, ConfirmSignupService],
  exports: [ConfirmSignupService],
})
export class ConfirmSignupModule {}
