
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  createUsers(createUsersDto: CreateUsersDto): { accessToken: any; refreshToken: any; } | PromiseLike<{ accessToken: any; refreshToken: any; }> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async createDonor(createDonorDto: CreateUsersDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = this.usersRepository.create(createDonorDto);
    await this.usersRepository.save(user);

    const accessToken = this.jwtService.sign({ sub: user.id, username: user.username });
    const refreshToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }
}
