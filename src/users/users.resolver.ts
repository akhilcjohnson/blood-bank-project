import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from 'src/entity/users.entity';
import { AuthTokens } from 'src/dto/auth.dto';
import { UsersInput } from 'src/inputs/user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Mutation(() => AuthTokens)
async registerUsers(@Args('input') createUsersDto: UsersInput): Promise<AuthTokens> {
  const newRegistration = await this.usersService.createUsers(createUsersDto);
  return newRegistration; 
}

  @Mutation(() => AuthTokens)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<string> {
    try {
      const { accessToken } = await this.usersService.login(email, password);
      return accessToken;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }
}

