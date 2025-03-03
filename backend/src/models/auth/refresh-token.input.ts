import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RefreshTokenInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Refresh token must be filled' })
  refresh_token: string;
}
