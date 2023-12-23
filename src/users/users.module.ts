// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../entity/users.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { jwtConstants } from '../jwt/jwt.constants';
import { GraphQLModule } from '@nestjs/graphql';
import { UserRepository } from './users.typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.refreshSecret, // Use a constant for the secret
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [ 
    UsersService,
    UsersResolver,
    UserRepository,
  ],
})
export class UsersModule {}
