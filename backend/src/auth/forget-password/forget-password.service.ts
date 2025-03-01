import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { ForgetPasswordInput } from '../../models/auth/forget-password.input';
import { ForgetPasswordResponse } from '../../models/auth/forget-password.response';
import { MailService } from '../../mail/mail.service';
import { UserModel } from '../../models/user/user.model';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class ForgetPasswordService {
  constructor(
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
  ) {}

  async forgetPassword({
    email,
  }: ForgetPasswordInput): Promise<ForgetPasswordResponse> {
    try {
      const user: UserModel | null = await this.prisma.users.findUnique({
        where: { email },
      });

      if (!user) throw new ApolloError('User not found', 'USER_NOT_FOUND');

      const payload = { sub: user.user_id, name: user.name };
      const accessToken: string = await this.jwtService.signAsync(payload);

      try {
        await this.mailService.sendResetPassword(
          { email: user.email, name: user.name },
          accessToken,
        );
      } catch (error) {
        throw new ApolloError(
          error.message || `Failed to send reset email to ${user.email}`,
          'SEND_CONFIRMATION_FAILED',
        );
      }

      await this.prisma.users.update({
        data: { resetPasswordToken: accessToken },
        where: { user_id: user.user_id },
      });

      return {
        success: true,
        message: 'Password reset link sent successfully',
      };
    } catch (error) {
      throw new ApolloError(
        error.message || 'Forgot password failed',
        error.extensions.code || 'FORGOT_PASSWORD_FAILED',
      );
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
