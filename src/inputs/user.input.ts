import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UsersInput {

  @Field()
  readonly full_Name: string;

  @Field()
  readonly email: string;

  @Field()
  readonly password: string;

  @Field()
  readonly mobile_Number: string;
}