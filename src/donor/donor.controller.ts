// src/donors/donors.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { DonorsService } from './donor.service';
import { CreateDonorDto } from './dto/create-donor.dto';

@Controller('donors')
export class DonorsController {
  constructor(private readonly donorsService: DonorsService) {}

//for creating the new user details
  @Post('register')
  async registerDonor(@Body() createDonorDto: CreateDonorDto): Promise<{ token: string }> {
    const token = await this.donorsService.createDonor(createDonorDto);
    return { token };
  }
}
