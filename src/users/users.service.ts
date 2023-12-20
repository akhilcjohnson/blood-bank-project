import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersInput } from 'src/inputs/user.input';
import { UserRepository } from './users.typeorm';



@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository, 
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async createUsers(createUsersDto: UsersInput): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.createUser(createUsersDto);
    return this.generateTokens(user);
  }

  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  private generateTokens(user: User): { accessToken: string, refreshToken: string } {
    const accessToken = this.jwtService.sign({ sub: user.id, username: user.email });
    const refreshToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }
}


