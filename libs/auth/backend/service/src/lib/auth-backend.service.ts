import { Injectable } from '@nestjs/common';
import { UserModel, UserRefreshTokenInfoModel } from '@jellyblog-nx/auth/user';
import { UserRoleEnum } from '../../../../user/src/lib/user-role.enum';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { addDays } from 'date-fns';

@Injectable()
export class AuthBackendService {

  constructor(
      private jwtService: JwtService,
  ) {
  }

  private initialDefaultAdmin: UserModel = {
    username: 'admin',
    role: UserRoleEnum.ADMIN,
  };

  private get defaultAdminWithPwd(): [UserModel, string] {
    const initialAdminPassword = process.env.DEFAULT_PWD || 'changeme';
    return [
      {
        ...this.initialDefaultAdmin
      },
      initialAdminPassword
    ];
  }

  // TODO replace with persistent store
  private refreshTokensInMemory: UserRefreshTokenInfoModel[] = [];

  private async findUserWithPwd(username: string): Promise<[UserModel, string] | undefined> {

    // If there is no any ADMIN users in store - try auth with default admin account
    if (username === this.initialDefaultAdmin.username) {
      return this.defaultAdminWithPwd;
    }

    return undefined;
  }

  private static matchPwd(pwdToMath: NonNullable<string>, pwdToMatchWith: NonNullable<string>) {
    return pwdToMath === pwdToMatchWith;
  }

  private generateRefreshToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      randomBytes(20, (err, buf) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(buf.toString('hex').toUpperCase());
      });
    });
  }

  async findAndValidateUser(username: NonNullable<string>, pwd: NonNullable<string>): Promise<UserModel | null> {
    const foundUserWithPwd = await this.findUserWithPwd(username);
    if (
        foundUserWithPwd
        && AuthBackendService.matchPwd(pwd, foundUserWithPwd[1])
    ) {
      return foundUserWithPwd[0];
    }
    return null;
  }

  async findUser(username: NonNullable<string>): Promise<UserModel | null> {
    // If there is no any ADMIN users in store - try auth with default admin account
    if (username === this.initialDefaultAdmin.username) {
      return {
        ...this.initialDefaultAdmin,
      };
    }
    return null;
  }

  async issueToken(user: UserModel) {
    const jwtPayload: UserModel = {
      ...user,
    };
    return {
      access_token: this.jwtService.sign(jwtPayload),
    };
  }

  async createAndRegisterRefreshToken(username: string): Promise<UserRefreshTokenInfoModel> {
    const refreshToken = await this.generateRefreshToken();
    const daysValid = parseInt(process.env.JWT_REFRESH_TOKEN_VALID_DAYS, 10) || 1;
    const validBefore = addDays(new Date(), daysValid);
    const userRefreshToken: UserRefreshTokenInfoModel = {
      token: refreshToken,
      username,
      validBefore,
    };
    this.refreshTokensInMemory.push(userRefreshToken);
    return userRefreshToken;
  }

  async findRefreshTokenInfo(token: string): Promise<UserRefreshTokenInfoModel | null> {
    return this.refreshTokensInMemory.find(info => info.token === token) || null;
  }
}
