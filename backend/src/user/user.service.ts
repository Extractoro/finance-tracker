import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserInput } from '../models/user/update-user.input';
import { Args } from '@nestjs/graphql';
import { UserModel } from '../models/user/user.model';
import { ApolloError } from 'apollo-server-express';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async findAllUsers(): Promise<UserModel[]> {
    return this.prisma.users.findMany();
  }

  async findById(id: string): Promise<UserModel> {
    if (!id) throw new NotFoundException();

    const user: UserModel | null = await this.prisma.users.findUnique({
      where: { user_id: id },
    });

    if (!user) throw new ApolloError('User not found', 'USER_NOT_FOUND');

    return user;
  }

  async updateUser(@Args('data') args: UpdateUserInput) {
    const existingUser: UserModel | null = await this.prisma.users.findUnique({
      where: { user_id: args.user_id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${args.user_id} not found`);
    }

    const emailChanged: boolean = Boolean(
      args?.email && args.email !== existingUser.email,
    );
    const passwordChanged: boolean = Boolean(
      args?.password &&
        !(await argon2.verify(existingUser.password, args.password)),
    );
    const nameChanged: boolean = Boolean(
      args?.name && args.name !== existingUser.name,
    );

    if (!nameChanged && !emailChanged && !passwordChanged)
      throw new ApolloError('No changes detected', 'NO_CHANGES');

    if (emailChanged) {
      const emailExists = await this.prisma.users.findUnique({
        where: { email: args.email },
      });

      if (emailExists) {
        throw new ApolloError(
          'This email is already in use',
          'EMAIL_ALREADY_IN_USE',
        );
      }
    }

    if (args.email === existingUser.email)
      throw new ApolloError(
        'New email must be different from the old one',
        'EMAIL_DUPLICATE',
      );

    if (
      args.password &&
      (await argon2.verify(existingUser.password, args.password))
    )
      throw new ApolloError(
        'New password must be different from the old one',
        'PASSWORD_DUPLICATE',
      );

    const payload = { sub: existingUser.user_id, email: args?.email };
    const accessToken: string | false =
      emailChanged &&
      (await this.jwtService.signAsync(payload, {
        expiresIn: '3h',
      }));
    const hashedPassword: string | false =
      passwordChanged && (await argon2.hash(args.password));

    try {
      if (!accessToken) return;
      await this.mailService.sendEmailChange(
        { email: args?.email, name: existingUser.name },
        accessToken,
      );
    } catch {
      throw new ApolloError(
        `Failed to send confirmation email to ${existingUser.email}`,
        'SEND_CONFIRMATION_FAILED',
      );
    }

    const updateData: Partial<UpdateUserInput> = {
      ...args,
      email: existingUser.email,
    };

    if (hashedPassword) {
      updateData.password = hashedPassword;
    }

    return this.prisma.users.update({
      data: updateData,
      where: { user_id: args.user_id },
    });
  }
}
