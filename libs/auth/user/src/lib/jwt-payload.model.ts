import { UserRoleEnum } from './user-role.enum';

export interface JwtPayloadModel {
  sub: string,
  role: UserRoleEnum;
}
