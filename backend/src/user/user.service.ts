import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserInput } from '../models/user/update-user.input';
import { Args } from '@nestjs/graphql';
import { UserModel } from '../models/user/user.model';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
    const existingUser = await this.prisma.users.findUnique({
      where: { user_id: args.user_id },
    });

    console.log(args);

    if (!existingUser) {
      throw new NotFoundException(`User with id ${args.user_id} not found`);
    }

    return this.prisma.users.update({
      data: args,
      where: { user_id: args.user_id },
    });
  }
}
