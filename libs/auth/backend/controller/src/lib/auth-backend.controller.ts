import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthBackendService } from '../../../service/src/lib/auth-backend.service';

@Controller('auth')
export class AuthBackendController {

  constructor(
      private authBackendServide: AuthBackendService,
  ) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authBackendServide.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
