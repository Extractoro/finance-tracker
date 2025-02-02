import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../user/user.model';

@ObjectType()
export class GoogleOauthResponse {
  @Field()
  message: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel | null;
}
