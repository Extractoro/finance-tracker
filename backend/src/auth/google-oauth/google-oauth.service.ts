import { Injectable } from '@nestjs/common';
import { GoogleOauthResponse } from '../../models/auth/google-oauth.response';
import { UserModel } from '../../models/user/user.model';

@Injectable()
export class GoogleOauthService {
  private user: UserModel | null = null;

  googleLogin(req): GoogleOauthResponse {
    if (!req.user) {
      return {
        message: 'No user from Google',
        user: null,
      };
    }

    this.user = req.user;

    return {
      message: 'User information from Google',
      user: req.user,
    };
  }

  getUser(): GoogleOauthResponse {
    return this.user
      ? { message: 'Success!', user: this.user }
      : {
          message: 'No user logged in',
          user: null,
        };
  }
}
