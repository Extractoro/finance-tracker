import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { SigninResponse } from '../../models/auth/signin.response';
import { SigninInput } from '../../models/auth/signin.input';
import { ApolloError } from 'apollo-server-express';
import { UserModel } from '../../models/user/user.model';
import * as argon2 from 'argon2';

@Injectable()
export class SigninService {
  constructor(
    private jwtService: JwtService,
    // private readonly mailService: MailService,
    private readonly prisma: PrismaService,
  ) {}

  async signIn({ email, password }: SigninInput): Promise<SigninResponse> {
    try {
      const existingUser: UserModel | null = await this.prisma.users.findUnique(
        {
          where: { email },
        },
      );

      if (!existingUser) {
        throw new ApolloError('User not found', 'USER_NOT_FOUND');
      }

      if (existingUser.verify === 0) {
        throw new ApolloError('User have not verified', 'USER_NO_VERIFICATION');
      }

      if (!(await argon2.verify(existingUser.password, password))) {
        throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
      }

      const payload = { sub: existingUser.user_id };
      const accessToken: string = await this.jwtService.signAsync(payload, {
        expiresIn: '3h',
      });
      const refreshToken: string = await this.jwtService.signAsync(payload, {
        expiresIn: '14d',
      });

      const hashedRefreshToken = await argon2.hash(refreshToken);
      await this.prisma.users.update({
        data: { refresh_token: hashedRefreshToken },
        where: {
          user_id: existingUser.user_id,
        },
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        message: 'Sign in successfully',
        success: true,
      };
    } catch (error) {
      throw new ApolloError(
        error.message || 'Route failed',
        error.extensions?.code || 'SIGNIN_FAILED',
      );
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
