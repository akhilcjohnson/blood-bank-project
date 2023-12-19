// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy, JwtRefreshStrategy } from '../jwt/jwt.strategy';
import { User } from '../entity/users.entity';
import { UsersService } from './users.service';
import { UserResolver } from './users.resolver';
import { jwtConstants } from '../jwt/jwt.constants';
import { UserRepository } from './users.typeorm';
// import { TokenModule } from './token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-refresh-token-secret',
      signOptions: { expiresIn: '30d' },
    }),
    //   TokenModule
  ],
  providers: [ UserRepository,
    UsersService,
    // JwtAccessStrategy,
    // JwtRefreshStrategy,
    UserResolver,
  ],
})
export class UsersModule {}
