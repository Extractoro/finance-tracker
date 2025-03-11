import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ResendConfirmInput } from '../../models/auth/resend-confirm.input';
import { ResendConfirmResponse } from '../../models/auth/resend-confirm.response';
import { ApolloError } from 'apollo-server-express';
import { UserModel } from '../../models/user/user.model';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class ResendConfirmService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async resendConfirm({
    email,
  }: ResendConfirmInput): Promise<ResendConfirmResponse> {
    try {
      const user: UserModel | null = await this.prisma.users.findUnique({
        where: { email, verify: 0 },
      });

      if (!user)
        throw new ApolloError(
          'User not found or already verified',
          'USER_NOT_FOUND_OR_ALREADY_VERIFIED',
        );

      const payload = { sub: user.user_id, name: user.name };
      const accessToken: string = await this.jwtService.signAsync(payload);

      try {
        await this.mailService.sendConfirmation(
          { email: user.email, name: user.name },
          accessToken,
        );
      } catch (error) {
        throw new ApolloError(
          error.message || `Failed to resend confirm email to ${user.email}`,
          'SEND_CONFIRMATION_FAILED',
        );
      }

      return {
        success: true,
        errorCode: null,
        message: 'Confirmation resent successfully!',
      };
    } catch (error) {
      throw new ApolloError(
        error.message || 'Resend confirm failed',
        error.extensions?.code || 'RESEND_CONFIRM_FAILED',
      );
    }
  }
}
