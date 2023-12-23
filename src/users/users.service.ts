import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersInput } from 'src/inputs/user.input';
import { UserRepository } from './users.typeorm';
import { UserType } from 'src/entity/user.enum';



@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository, 
  ) {}
  async getUsers(email: string, user_type: UserType): Promise<User[]> {
    try {
      const userAdmin = await this.userRepository.findByEmail(email);
      if ( userAdmin|| userAdmin.user_type === UserType.ADMIN) {
        return await this.userRepository.find(); // if user_type is admin return all users
      } 
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  async createUsers(createUsersDto: UsersInput): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.createUser(createUsersDto);
    return this.generateTokens(user);
  }


  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found'); // if user not found
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password'); // If incorrect password
    }
    return this.generateTokens(user);
  }

  private generateTokens(user: User): { accessToken: string, refreshToken: string } {
    const accessToken = this.jwtService.sign({ sub: user.id, username: user.email });
    const refreshToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  
}


