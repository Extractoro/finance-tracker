import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindUserArgs {
  @Field()
  id: string;
}
