import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { RefreshTokenInput } from '../../models/auth/refresh-token.input';
import { RefreshTokenResponse } from '../../models/auth/refresh-token.response';
import { ApolloError } from 'apollo-server-express';
import { UserModel } from '../../models/user/user.model';
import * as argon2 from 'argon2';

@Injectable()
export class RefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async refreshToken({
    refresh_token,
  }: RefreshTokenInput): Promise<RefreshTokenResponse> {
    try {
      const decoded = this.jwtService.decode(refresh_token) as { sub: string };
      if (!decoded || !decoded.sub) {
        throw new ApolloError('Invalid refresh token', 'TOKEN_INVALID');
      }

      const user: UserModel | null = await this.prisma.users.findFirst({
        where: { user_id: decoded.sub },
      });

      if (!user) {
        throw new ApolloError('User not found', 'USER_NOT_FOUND');
      }
      if (!user.refresh_token) {
        throw new ApolloError('Refresh token not found', 'TOKEN_NOT_FOUND');
      }

      const isValid = await argon2.verify(user.refresh_token, refresh_token);
      if (!isValid) {
        throw new ApolloError('Invalid refresh token', 'TOKEN_INVALID');
      }

      const accessToken: string = await this.jwtService.signAsync(
        { sub: user.user_id },
        {
          expiresIn: '3h',
        },
      );
      const refreshToken: string = await this.jwtService.signAsync(
        { sub: user.user_id },
        {
          expiresIn: '14d',
        },
      );

      const hashedRefreshToken = await argon2.hash(refreshToken);

      await this.prisma.users.update({
        data: { refresh_token: hashedRefreshToken },
        where: {
          user_id: user.user_id,
        },
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        success: true,
        message: 'Tokens were updated successfully',
      };
    } catch (error) {
      const errorCode =
        error.extensions.code ||
        (error.message.includes('expired')
          ? 'TOKEN_EXPIRED'
          : 'REFRESH_TOKEN_FAILED');
      throw new ApolloError(error.message || 'Refresh token failed', errorCode);
    }
  }
}
