import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../../configs/jwt.config';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  providers: [PrismaService, RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
