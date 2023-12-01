import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './donor/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './donor/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234567890',
      database: 'blood',
      entities: [Users],
      synchronize: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '15m' }, // Access token expiration time
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
