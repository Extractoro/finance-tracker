import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TransactionsModule } from './transactions/transactions.module';
import graphqlConfig from './configs/graphql.config';
import configModuleConfig from './configs/config-module.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    UserModule,
    AuthModule,
    MailModule,
    CategoryModule,
    TransactionsModule,
  ],
})
export class AppModule {}
