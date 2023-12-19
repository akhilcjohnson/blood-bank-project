
// app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { jwtConstants } from './jwt/jwt.constants';
// import { TokenModule } from './users/token.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entity/users.entity';
import { join } from 'path';


@Module({
  imports: [
    UsersModule,

    // TokenModule,
    ConfigModule.forRoot(), // Import the ConfigModule for environment variables

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    PassportModule, // Configure Passport module for authentication
    JwtModule.register({ //Configure JWT for authentication
      secret: 'your-secret-key',
      signOptions: { expiresIn: '15m' }, // Access token expiration time
    }),
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(),'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}