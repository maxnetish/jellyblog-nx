import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { UserModel } from '@jellyblog-nx/auth/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'músogköttur',
    });
  }

  async validate<T extends UserModel>(jwtPayload: T): Promise<UserModel> {
    return {
      username: jwtPayload.username,
      role: jwtPayload.role,
    };
  }
}
