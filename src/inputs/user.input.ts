import { InputType, Field } from '@nestjs/graphql';
import { UserType } from 'src/entity/user.enum';

@InputType()
export class UsersInput {

  @Field()
  readonly user_type: UserType;

  @Field()
  readonly full_Name: string;

  @Field()
  readonly email: string;

  @Field()
  readonly password: string;

  @Field()
  readonly mobile_Number: string;
}