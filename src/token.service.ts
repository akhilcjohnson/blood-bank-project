import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/entity/users.entity';

@Injectable()
export class TokenService {
  generateAccessToken(user: User): string { // access token  logic
    return jwt.sign({ sub: user.id, email: user.email }, 'your_access_token_secret', { expiresIn: '15m' });
  }

  generateRefreshToken(user: User): string {//  refresh token  logic
    const refreshToken = this.generateUniqueRefreshToken();
    return refreshToken;
  }

  signCombinedToken(payload: any): string {  // secret key to sign the combined token
    const secretKey = 'your_secret_key';
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  }

  private generateUniqueRefreshToken(): string {// logic to generate a unique refresh token    
    const uuid = require('uuid');
    return uuid.v4();
}
}
