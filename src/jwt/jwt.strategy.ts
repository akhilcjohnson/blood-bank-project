  import { Injectable } from '@nestjs/common';
  import { PassportStrategy } from '@nestjs/passport';
  import { ExtractJwt, Strategy } from 'passport-jwt';

  // Define a class for JWT access strategy
  @Injectable()
  export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: 'your-secret-key',
      });
    }

    // Define a validate method of the JWT payload for access tokens
    async validate(payload: any) {
      return { userId: payload.sub, email: payload.email };
    }
  }

  // Define a class for JWT refresh strategy
  @Injectable()
  export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'), // Use 'refreshToken' field from the request body
        ignoreExpiration: false,
        secretOrKey: 'your-refresh-token-secret',
      });
    }

    // Define a validate method of the JWT payload for refresh tokens
    async validate(payload: any) {
      return { userId: payload.sub, email: payload.email };
    }
  }
