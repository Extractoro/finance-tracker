import { Query, Resolver } from '@nestjs/graphql';
import { GoogleOauthService } from './google-oauth.service';
import { GoogleOauthResponse } from '../../models/auth/google-oauth.response';

@Resolver()
export class GoogleOauthResolver {
  constructor(private readonly googleOauthService: GoogleOauthService) {}

  @Query(() => GoogleOauthResponse)
  async getGoogleUser(): Promise<GoogleOauthResponse> {
    return this.googleOauthService.getUser();
  }
}
