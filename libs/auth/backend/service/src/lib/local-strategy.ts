import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { AuthBackendService } from './auth-backend.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
      private authService: AuthBackendService,
  ) {
    super();
  }

  async validate(
      username: string,
      pwd: string
  ) {
    if (!username || !pwd) {
      Logger.debug('Username or password cannot be empty');
      throw new HttpException('Username or password cannot be empty', HttpStatus.BAD_REQUEST);
    }

    const user = await this.authService.findAndValidateUser(username, pwd);
    if (!user) {
      Logger.debug(`Authentication fails for ${username}`);
      throw new UnauthorizedException();
    }
    Logger.debug(`Authentication success for ${username}`);
    return user;
  }
}
