import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserInput } from '../models/user/update-user.input';
import { Args } from '@nestjs/graphql';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAllUsers() {
    return this.prisma.users.findMany();
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
