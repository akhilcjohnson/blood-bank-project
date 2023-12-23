import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from 'src/entity/users.entity';
import { AuthTokens } from 'src/dto/auth.dto';
import { UsersInput } from 'src/inputs/user.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserType } from 'src/entity/user.enum';
// import { AdminGuard } from 'src/guards/admin.guard';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}


  @Query(() => [User])
  async getlistUsers(@Args('email') email: string, @Args('user_type') user_type: UserType): Promise<User[]> {
    return this.usersService.getUsers(email,user_type);
  }


  @Mutation(() => AuthTokens)
async registerUsers(@Args('input') createUsersDto: UsersInput): Promise<AuthTokens> {
  const newRegistration = await this.usersService.createUsers(createUsersDto);
  return newRegistration; 
}

@Mutation(() => AuthTokens)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<AuthTokens> {
    try {
      const newLogin = await this.usersService.login(email, password);
      return newLogin;
    } catch (error) {
      throw new ApolloError('Invalid email or password');
    }
  }

 

}

