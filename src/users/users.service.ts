import { ConflictException, Injectable, NotFoundException,  } from '@nestjs/common';
import { UserRepository } from './users.typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersInput } from 'src/inputs/user.input';
import { User } from 'src/entity/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}


  async register(input: UsersInput): Promise<User> {
    const existUser = await this.usersRepository.findByEmail(input.email);
    if (existUser){
    throw new Error('User with this email already exists');
  }
  const newUser = await this.usersRepository.register(input);
  return newUser;
}


  async login(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user || user.password !== password) {
      throw new NotFoundException('Invalid email or password');
    }
    return user;
  }
}













  // async createUsers(userData: CreateUsersInput): Promise<{ accessToken: string; refreshToken: string }> {
  //   const { email, password } = userData;

  //   // Check if the user already exists
  //   const existingUser = await this.usersRepository.findByEmail(email);
  //   if (existingUser) {
  //     throw new ConflictException('User with this email already exists');
  //   }

  //   // Hash the password before saving it
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   // Create a new user
  //   const newUser = await this.usersRepository.createUser({ ...userData, password: hashedPassword });

  //   // Generate JWT tokens
  //   const accessToken = this.generateAccessToken(newUser);
  //   const refreshToken = this.generateRefreshToken(newUser);

  //   return { accessToken, refreshToken };
  // }

