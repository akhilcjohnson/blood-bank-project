import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donor } from './entity/donor.entity';
import { CreateDonorDto } from './dto/create-donor.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DonorsService {
  constructor( @InjectRepository(Donor) private donorsRepository: Repository<Donor>,  
  private readonly jwtService: JwtService) {}

  async createDonor(createDonorDto: CreateDonorDto): Promise<string> {
    const donor = this.donorsRepository.create(createDonorDto);
    await this.donorsRepository.save(donor);

    //  JWT token 

    const token = this.jwtService.sign({ userId: donor.id, username: donor.username }); 
    return 'JWT_TOKEN_HERE';
  }
}


