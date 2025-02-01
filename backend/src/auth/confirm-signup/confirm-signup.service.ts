import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { ConfirmSignupResponse } from '../../models/auth/confirm-signup.response';
import { UserModel } from '../../models/user/user.model';
import { ApolloError } from 'apollo-server-express';
import { ConfirmSignupInput } from '../../models/auth/confirm-signup.input';

@Injectable()
export class ConfirmSignupService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async confirmSignup({
    token,
  }: ConfirmSignupInput): Promise<ConfirmSignupResponse> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user: UserModel | null = await this.prisma.users.findUnique({
        where: { user_id: payload.sub },
      });

      if (!user) {
        throw new ApolloError('User not found', 'USER_NOT_FOUND');
      }

      if (user.verify === 1) {
        throw new ApolloError(
          'User is already verified',
          'USER_ALREADY_VERIFIED',
        );
      }

      await this.prisma.users.update({
        where: { user_id: payload.sub },
        data: { verify: 1 },
      });

      return {
        success: true,
        message: 'User confirmed successfully',
        errorCode: null,
      };
    } catch {
      throw new ApolloError('Invalid or expired token', 'INVALID_TOKEN');
    }
  }
}
