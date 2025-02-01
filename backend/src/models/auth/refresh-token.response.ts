import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokenResponse {
  @Field(() => String)
  access_token: string;

  @Field(() => String, { nullable: true })
  refresh_token?: string;

  @Field(() => Boolean, { nullable: true })
  success?: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  errorCode?: string | null;
}
