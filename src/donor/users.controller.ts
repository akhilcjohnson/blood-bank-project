import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('donors')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUsers(@Body() createUsersDto: CreateUsersDto, @Res() res): Promise<void> {
    const { accessToken, refreshToken } = await this.usersService.createUsers(createUsersDto);

    // Set cookies for refresh token
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    // Send normal response with access token
    res.json({ accessToken });
  }
}
