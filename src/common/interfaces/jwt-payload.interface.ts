import { UserRole } from 'src/modules/user/user.entity';

export interface JwtPayload {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
}
