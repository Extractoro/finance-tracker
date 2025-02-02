import { Injectable } from '@nestjs/common';
import { GoogleOauthResponse } from '../../models/auth/google-oauth.response';

@Injectable()
export class GoogleOauthService {
  googleLogin(req): GoogleOauthResponse {
    if (!req.user) {
      return {
        message: 'No user from google',
        user: null,
      };
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
