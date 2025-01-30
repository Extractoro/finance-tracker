import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';
import { Args } from '@nestjs/graphql';
import { CreateUserInput } from '../models/user/create-user.input';
import { UpdateUserInput } from '../models/user/update-user.input';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  findAllUsers() {
    return this.prisma.users.findMany();
  }

  async createUser(@Args('data') args: CreateUserInput) {
    return this.prisma.users.create({
      data: args,
    });
  }

  async updateUser(@Args('data') args: UpdateUserInput) {
    const existingUser = await this.prisma.users.findUnique({
      where: { user_id: args.user_id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${args.user_id} not found`);
    }

    return this.prisma.users.update({
      data: args,
      where: { user_id: args.user_id },
    });
  }
}
