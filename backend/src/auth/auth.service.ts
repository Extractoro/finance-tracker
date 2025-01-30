import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Args } from '@nestjs/graphql';
import { PrismaService } from '../prisma.service';
import { SignupInput } from '../models/auth/signup.input';
import { UuidService } from 'nestjs-uuid';
import { MailService } from '../mail/mail.service';

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
}
