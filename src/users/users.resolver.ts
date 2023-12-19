import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Res } from '@nestjs/common';
import { UsersInput } from 'src/inputs/user.input';
import { User } from 'src/entity/users.entity';
import { AuthTokens } from 'src/dto/auth.dto';


 
@Resolver()
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello, GraphQL!';
  }

  @Mutation(() => User)
  async registerUser(@Args('input') input: UsersInput): Promise<User> {
    return await this.usersService.register(input);
  }

  @Mutation(() => User)
  async loginUser(@Args('email') email: string, @Args('password') password: string): Promise<User> {
    return await this.usersService.login(email, password);
  }
}
  


 
  

   
  









  
  //   @Post('login')
  //   async login(@Body() { email, password }: { email: string; password: string }, @Res() res): Promise<void> {
  //     try {
  //       // Call the login method from the UsersService to perform user login
  //       const { accessToken, refreshToken } = await this.usersService.login(email, password);
  
  //       // Set cookies for the refresh token in the HTTP response
  //       res.cookie('refreshToken', refreshToken, { httpOnly: true });
  
        
  //       // Send a JSON response with the access token
  //       res.json({ accessToken });
  //     } 
  //     catch (error) {
  //       // Handle login failure, e.g., return a 401 Unauthorized response
  //       res.status(401).json({ message: 'Invalid credentials' });
  //     }
  //   }
  // }