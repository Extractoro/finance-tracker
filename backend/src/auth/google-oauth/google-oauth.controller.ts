import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleOauthService } from './google-oauth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private readonly googleOauthService: GoogleOauthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return { message: 'Redirecting to Google' };
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    return this.googleOauthService.googleLogin(req);
  }
}
