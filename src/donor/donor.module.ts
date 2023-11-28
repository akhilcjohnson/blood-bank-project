// src/donors/donors.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donor } from './entity/donor.entity';
import { DonorsService } from './donor.service';
import { DonorsController } from './donor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Donor])],
  providers: [DonorsService],
  controllers: [DonorsController],
})
export class DonorsModule {}
