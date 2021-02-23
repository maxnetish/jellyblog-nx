import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayloadModel } from '@jellyblog-nx/auth/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'músogköttur',
    });
  }

  async validate(jwtPayload: JwtPayloadModel): Promise<JwtPayloadModel> {
    return {
      sub: jwtPayload.sub,
        role: jwtPayload.role,
    };
  }
}
