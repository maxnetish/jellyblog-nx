import { UserRoleEnum } from './user-role.enum';

export interface UserModel {
  username: NonNullable<string>;
  role: NonNullable<UserRoleEnum>;
}
