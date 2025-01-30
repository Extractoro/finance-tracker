import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';
import { Args } from '@nestjs/graphql';
import { CreateUserInput } from '../models/user/create-user.input';

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
}
