import { Injectable } from '@nestjs/common';
import { JwtPayloadModel, UserModel } from '@jellyblog-nx/auth/user';
import { UserRoleEnum } from '../../../../user/src/lib/user-role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthBackendService {

  constructor(
      private jwtService: JwtService,
  ) {
  }

  private initialDefaultAdmin: UserModel = {
    id: '0',
    email: 'admin@admin',
    alias: 'Admin',
    role: UserRoleEnum.ADMIN,
    avatar: null
  };

  private get defaultAdminWithPwd(): [UserModel, string] {
    const initialAdminPassword = process.env.DEFAULT_PWD || 'admin';
    return [
      {
        ...this.initialDefaultAdmin
      },
      initialAdminPassword
    ];
  }

  private async findUserWithPwd(username: string): Promise<[UserModel, string] | undefined> {

    // If there is no any ADMIN users in store - try auth with default admin account
    if (username === this.initialDefaultAdmin.email) {
      return this.defaultAdminWithPwd;
    }

    return undefined;
  }

  private static matchPwd(pwdToMath: NonNullable<string>, pwdToMatchWith: NonNullable<string>) {
    return pwdToMath === pwdToMatchWith;
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

  async login(user: UserModel) {
    const jwtPayload: JwtPayloadModel = {
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(jwtPayload),
    };
  }
}
