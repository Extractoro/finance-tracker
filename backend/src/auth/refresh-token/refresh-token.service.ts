import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { RefreshTokenResponse } from '../../models/auth/refresh-token.response';
import { ApolloError } from 'apollo-server-express';
import { UserModel } from '../../models/user/user.model';
import * as argon2 from 'argon2';
import { extractTokenFromCookies } from '../../utils/cookie';
import { Request } from 'express';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async refreshToken(req: Request): Promise<RefreshTokenResponse> {
    try {
      const cookieHeader = req.headers.cookie;
      if (!cookieHeader) {
        throw new ApolloError('No cookies found', 'NO_COOKIE_HEADER');
      }

      console.log(cookieHeader);

      const refreshToken = extractTokenFromCookies(
        cookieHeader,
        'refreshToken',
      );
      if (!refreshToken) {
        throw new ApolloError('No refresh token found', 'NO_REFRESH_TOKEN');
      }

      const decoded = this.jwtService.decode(refreshToken) as { sub: string };
      console.log(decoded);

      if (!decoded || !decoded.sub) {
        throw new ApolloError('Invalid token', 'TOKEN_INVALID');
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

      const isValid = await argon2.verify(user.refresh_token, refreshToken);
      if (!isValid) {
        throw new ApolloError('Invalid refresh token', 'TOKEN_INVALID');
      }

      const newAccessToken: string = await this.jwtService.signAsync(
        { sub: user.user_id },
        {
          expiresIn: '3h',
        },
      );
      const newRefreshToken: string = await this.jwtService.signAsync(
        { sub: user.user_id },
        {
          expiresIn: '14d',
        },
      );

      const hashedRefreshToken = await argon2.hash(newRefreshToken);

      await this.prisma.users.update({
        data: { refresh_token: hashedRefreshToken },
        where: {
          user_id: user.user_id,
        },
      });

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        success: true,
        message: 'Tokens were updated successfully',
      };
    } catch (error) {
      const errorCode =
        error.extensions?.code ||
        (error.message.includes('expired')
          ? 'TOKEN_EXPIRED'
          : 'REFRESH_TOKEN_FAILED');
      throw new ApolloError(error.message || 'Refresh token failed', errorCode);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
