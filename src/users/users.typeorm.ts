
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { UsersInput } from 'src/inputs/user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new Error('Failed to fetch user by email');
    }
  }
  async find(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error('Failed to fetch all users');
    }
  }

  async createUser(createUsersDto: UsersInput): Promise<User> {
    const { password, ...userData } = createUsersDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ ...userData, password: hashedPassword });
    const newRegistration = await this.userRepository.save(user);
    return newRegistration;
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

 
 
}


































// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../entity/users.entity';
// import { UsersInput } from 'src/inputs/user.input';

// @Injectable()
// export class UserRepository {
//   constructor(
//     @InjectRepository(User)
//     private readonly usersRepository: Repository<User>,
//   ) {}


//   async register(userData: Partial<UsersInput>): Promise<User> {
//     const newUser = this.usersRepository.create(userData);
//     return await this.usersRepository.save(newUser);
//   }

//   async findByEmail(email: string): Promise<User | null> {
//     return await this.usersRepository.findOne({ where: { email } });
//   }
// }