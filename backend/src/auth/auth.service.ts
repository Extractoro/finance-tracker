import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Args } from '@nestjs/graphql';
import { PrismaService } from '../prisma.service';
import { SignupInput } from '../models/auth/signup.input';
import { UuidService } from 'nestjs-uuid';
import { MailService } from '../mail/mail.service';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
    private readonly uuidService: UuidService,
  ) {}

  async signUp(@Args('data') args: SignupInput) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: args.email },
    });

    if (existingUser) {
      throw new NotFoundException(
        `User with this email ${args.email} has already been registered`,
      );
    }

    const userId: string = this.uuidService.generate({ version: 4 });
    const payload = { sub: userId, name: args.name };
    const accessToken: string = await this.jwtService.signAsync(payload);

    await this.mailService.sendConfirmation(
      { email: args.email, name: args.name },
      accessToken,
    );

    return this.prisma.users.create({
      data: {
        user_id: userId,
        ...args,
      },
    });
  }

  async confirmSignup(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.prisma.users.findUnique({
        where: { user_id: payload.sub },
      });

      if (!user) {
        return Promise.reject(
          new ApolloError('User not found', 'USER_NOT_FOUND'),
        );
      }

      if (user.verify === 1) {
        return Promise.reject(
          new ApolloError('User is already verified', 'USER_ALREADY_VERIFIED'),
        );
      }

      await this.prisma.users.update({
        where: { user_id: payload.sub },
        data: { verify: 1 },
      });

      return true;
    } catch {
      throw new ApolloError('Invalid or expired token', 'INVALID_TOKEN');
    }
  }
}
