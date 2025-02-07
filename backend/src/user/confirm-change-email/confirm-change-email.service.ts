import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { ConfirmChangeEmailInput } from '../../models/user/confirm-change-email.input';
import { ConfirmChangeEmailResponse } from '../../models/user/confirm-change-email.response';
import { ApolloError } from 'apollo-server-express';
import { UserModel } from '../../models/user/user.model';

@Injectable()
export class ConfirmChangeEmailService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async confirmChangeEmail({
    token,
  }: ConfirmChangeEmailInput): Promise<ConfirmChangeEmailResponse> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user: UserModel | null = await this.prisma.users.findUnique({
        where: { user_id: payload.sub },
      });

      if (!user) {
        throw new ApolloError('User not found', 'USER_NOT_FOUND');
      }

      await this.prisma.users.update({
        data: { email: payload.email },
        where: { user_id: payload.sub },
      });

      return {
        success: true,
        message: 'Email successfully changed',
        errorCode: null,
      };
    } catch {
      throw new ApolloError('Invalid or expired token', 'INVALID_TOKEN');
    }
  }
}
