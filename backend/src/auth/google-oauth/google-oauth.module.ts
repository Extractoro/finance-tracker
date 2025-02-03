import { Module } from '@nestjs/common';
import { GoogleOauthService } from './google-oauth.service';
import { GoogleOauthResolver } from './google-oauth.resolver';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleOauthController } from './google-oauth.controller';

@Module({
  imports: [ConfigModule],
  providers: [GoogleOauthResolver, GoogleOauthService, GoogleOauthStrategy],
  controllers: [GoogleOauthController],
})
export class GoogleOauthModule {}
