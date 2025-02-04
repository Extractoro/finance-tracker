import { Module } from '@nestjs/common';
import { GoogleOauthService } from './google-oauth.service';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleOauthController } from './google-oauth.controller';
import { PrismaService } from '../../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../../configs/jwt.config';
import { UuidService } from 'nestjs-uuid';

@Module({
  imports: [ConfigModule, JwtModule.register(jwtConfig)],
  providers: [
    PrismaService,
    UuidService,
    GoogleOauthService,
    GoogleOauthStrategy,
  ],
  controllers: [GoogleOauthController],
})
export class GoogleOauthModule {}
