import { JwtModuleOptions } from '@nestjs/jwt';
import { env } from './env';

export const jwtConfig: JwtModuleOptions = {
  secret: env.JWT_SECRET,
  signOptions: {
    expiresIn: '5d',
  },
};
