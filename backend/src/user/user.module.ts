import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';

@Module({
  providers: [PrismaService, UserResolver, UserService, AuthService],
  exports: [UserService],
})
export class UserModule {}
