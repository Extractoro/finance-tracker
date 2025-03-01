import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { ResetPasswordInput } from '../../models/auth/reset-password.input';
import { ResetPasswordResponse } from '../../models/auth/reset-password.response';
import { ApolloError } from 'apollo-server-express';
import { UserModel } from '../../models/user/user.model';
import * as argon2 from 'argon2';

@Injectable()
export class ResetPasswordService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async resetPassword({
    token,
    new_password,
  }: ResetPasswordInput): Promise<ResetPasswordResponse> {
    try {
      const decoded = (await this.jwtService.verifyAsync(token)) as {
        sub: string;
        name: string;
      };

      if (!decoded || !decoded.sub) {
        throw new ApolloError('Invalid reset token', 'TOKEN_INVALID');
      }

      const user: UserModel | null = await this.prisma.users.findUnique({
        where: { user_id: decoded.sub },
      });

      if (!user) throw new ApolloError('User not found', 'USER_NOT_FOUND');

      if (!user.resetPasswordToken)
        throw new ApolloError('Incorrect reset token', 'INCORRECT_RESET_TOKEN');

      const isSamePassword = await argon2.verify(user.password, new_password);
      if (isSamePassword) {
        throw new ApolloError(
          'New password must be different',
          'PASSWORD_SAME',
        );
      }

      const hashedNewPassword: string = await argon2.hash(new_password);

      await this.prisma.users.update({
        data: {
          password: hashedNewPassword,
          refresh_token: null,
          resetPasswordToken: null,
        },
        where: { user_id: decoded.sub },
      });

      return {
        success: true,
        message: 'Reset password successfully',
      };
    } catch (error) {
      throw new ApolloError(
        error.message || 'Reset password failed',
        error.extensions.code || 'RESET_PASSWORD_FAILED',
      );
    }
  }
}
