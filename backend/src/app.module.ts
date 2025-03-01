import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import googleOauthConfig from './configs/google-oauth.config';
import graphqlConfig from './configs/graphql.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [googleOauthConfig] }),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    UserModule,
    AuthModule,
    MailModule,
    CategoryModule,
  ],
})
export class AppModule {}
