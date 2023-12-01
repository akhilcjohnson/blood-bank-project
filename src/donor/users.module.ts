
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy, JwtRefreshStrategy } from './jwt/jwt.strategy'; // Update the path accordingly
import { Users } from './entity/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Users]),
  JwtModule.register({
    secret: 'your-refresh-token-secret',
    signOptions: { expiresIn: '30d' },
  }),],
  providers: [UsersService, JwtAccessStrategy, JwtRefreshStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
