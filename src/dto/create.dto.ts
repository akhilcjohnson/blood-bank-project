  // create-users.input.ts
  import { Field, InputType, ObjectType } from '@nestjs/graphql';

  @ObjectType()
  export class CreateUsersDto {
    @Field()
    full_Name!: string;
  
    @Field()
    email!: string;
  
    @Field()
    password!: string;
  
    @Field()
    mobile_Number!: string;
  }
  