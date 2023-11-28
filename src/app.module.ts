import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonorsModule } from './donor/donor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donor } from './donor/entity/donor.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DonorsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234567890',
      database: 'blood',
      entities: [Donor],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'secret-key', // need to replace with your secret key
      signOptions: { expiresIn: '60s' }, // Token expiration time
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
