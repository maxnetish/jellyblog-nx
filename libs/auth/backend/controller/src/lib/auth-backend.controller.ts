import { Controller, Req, Post, UseGuards, Get, Res, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthBackendService } from '../../../service/src/lib/auth-backend.service';
import { UserModel } from '@jellyblog-nx/auth/user';
import { Response } from 'express';

@Controller('auth')
export class AuthBackendController {

  constructor(
      private authBackendServide: AuthBackendService,
  ) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('token/issue')
  async issueToken(@Req() { user }: { user: UserModel }, @Res({ passthrough: true }) res: Response) {
    const refreshTokenInfo = await this.authBackendServide.createAndRegisterRefreshToken(user.username);
    res.cookie(
        'refresh-token',
        refreshTokenInfo.token,
        {
          expires: refreshTokenInfo.validBefore,
          httpOnly: true,
          secure: !process.env.DEVELOPMENT,
          signed: true,
        },
    );
    return this.authBackendServide.issueToken(user);
  }

  @Post('token/refresh')
  async refreshToken(@Req() { signedCookies }: { signedCookies: any }, @Res() res: Response) {
    const refreshToken = signedCookies['refresh-token'];

    if (!refreshToken) {
      // if not setted refresh-token cookie
      throw new UnauthorizedException();
    }

    const existentRefreshTokenInfo = await this.authBackendServide.findRefreshTokenInfo(refreshToken);

    if (!existentRefreshTokenInfo) {
      // If token absence in registered tokens
      throw new UnauthorizedException();
    }

    if (existentRefreshTokenInfo.validBefore < new Date()) {
      // If token expired
      throw new UnauthorizedException();
    }

    const user = await this.authBackendServide.findUser(existentRefreshTokenInfo.username);

    if (!user) {
      // If user not found
      throw new UnauthorizedException();
    }

    const newRefreshTokenInfo = await this.authBackendServide.createAndRegisterRefreshToken(user.username);
    res.cookie(
        'refresh-token',
        newRefreshTokenInfo.token,
        {
          expires: newRefreshTokenInfo.validBefore,
          httpOnly: true,
          secure: !process.env.DEVELOPMENT,
          signed: true,
        },
    );

    return this.authBackendServide.issueToken(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() { user }: { user: UserModel }) {
    return user;
  }
}
