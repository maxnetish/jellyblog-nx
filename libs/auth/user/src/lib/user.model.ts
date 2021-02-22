import { UserRoleEnum } from './user-role.enum';

export interface UserModel {
  id: NonNullable<string>;
  email: NonNullable<string>;
  alias: NonNullable<string>;
  avatar: string;
  role: NonNullable<UserRoleEnum>;
}
