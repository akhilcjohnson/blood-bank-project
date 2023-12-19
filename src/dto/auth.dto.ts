// user.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthTokens {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}