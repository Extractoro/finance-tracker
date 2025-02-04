import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GoogleUser } from '../../models/auth/google-oauth';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UuidService } from 'nestjs-uuid';
import { UserModel } from '../../models/user/user.model';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class GoogleOauthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private uuidService: UuidService,
  ) {}

  async googleLogin(
    req: Request,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!req.user) {
      throw new Error('No user from Google');
    }

    const { email, firstName } = req.user as Partial<GoogleUser>;

    if (!email || !firstName) throw new ApolloError('Invalid user credentials');

    return this.prisma.$transaction(async (prisma) => {
      let user: UserModel | null = await this.prisma.users.findUnique({
        where: { email },
      });

      if (!user) {
        const userId: string = this.uuidService.generate({ version: 4 });
        const hashedPassword: string = await argon2.hash(
          this.uuidService.generate({ version: 4 }),
        );

        user = await this.prisma.users.create({
          data: {
            user_id: userId,
            name: firstName,
            email,
            password: hashedPassword,
          },
        });
      }

      const payload = { sub: user?.user_id, name: user?.name };
      const accessToken: string = await this.jwtService.signAsync(payload, {
        expiresIn: '3h',
      });
      const refreshToken: string = await this.jwtService.signAsync(payload, {
        expiresIn: '14d',
      });
      const hashedRefreshToken = await argon2.hash(refreshToken);

      await prisma.users.update({
        where: { email },
        data: { refresh_token: hashedRefreshToken, verify: 1 },
      });

      return { accessToken, refreshToken };
    });
  }
}
