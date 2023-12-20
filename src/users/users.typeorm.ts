// user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { UsersInput } from 'src/inputs/user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUsersDto: UsersInput): Promise<User> {
    const { password, ...userData } = createUsersDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ ...userData, password: hashedPassword });
    const newRegistration = await this.usersRepository.save(user);

    return newRegistration; // Return the saved user object instead of tokens
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
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