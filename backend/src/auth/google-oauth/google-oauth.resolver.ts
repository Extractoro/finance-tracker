import { Query, Resolver } from '@nestjs/graphql';
import { GoogleOauthService } from './google-oauth.service';
import { Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthResponse } from '../../models/auth/google-oauth.response';

@Resolver()
export class GoogleOauthResolver {
  constructor(private readonly googleOauthService: GoogleOauthService) {}

  @Query(() => String)
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request): Promise<string> {
    return 'Google Auth Started';
  }

  @Query(() => GoogleOauthResponse)
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request): GoogleOauthResponse {
    return this.googleOauthService.googleLogin(req);
  }
}
