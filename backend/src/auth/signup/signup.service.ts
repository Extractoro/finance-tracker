import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
import { PrismaService } from '../../prisma.service';
import { UuidService } from 'nestjs-uuid';
import { ApolloError } from 'apollo-server-express';
import { SignupInput } from '../../models/auth/signup.input';
import { SignupResponse } from '../../models/auth/signup-response.model';
import * as argon2 from 'argon2';

@Injectable()
export class SignupService {
  constructor(
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
    private readonly uuidService: UuidService,
  ) {}

  async signUp({ password, ...rest }: SignupInput): Promise<SignupResponse> {
    try {
      const existingUser = await this.prisma.users.findUnique({
        where: { email: rest.email },
      });

      if (existingUser) {
        throw new ApolloError(
          `User with this email ${rest.email} has already been registered`,
          'EMAIL_ALREADY_REGISTERED',
        );
      }

      const userId: string = this.uuidService.generate({ version: 4 });
      const payload = { sub: userId, name: rest.name };
      const accessToken: string = await this.jwtService.signAsync(payload);
      const hashedPassword: string = await argon2.hash(password);

      try {
        await this.mailService.sendConfirmation(
          { email: rest.email, name: rest.name },
          accessToken,
        );
      } catch {
        throw new ApolloError(
          `Failed to send confirmation email to ${rest.email}`,
          'SEND_CONFIRMATION_FAILED',
        );
      }

      await this.prisma.users.create({
        data: {
          user_id: userId,
          ...rest,
          password: hashedPassword,
        },
      });

      return {
        success: true,
        message: 'User registered successfully',
        errorCode: null,
      };
    } catch (error) {
      throw new ApolloError(
        error.message || 'Signup failed',
        error.code || 'SIGNUP_FAILED',
      );
    }
  }
}
