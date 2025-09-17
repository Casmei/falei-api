import { cleanEnv, port, str } from 'envalid';

export const env = cleanEnv(process.env, {
  DATABASE_HOST: str({
    default: 'postgres',
  }),
  DATABASE_PORT: port({
    default: 5432,
  }),
  DATABASE_USER: str({
    default: 'falei-user',
  }),
  DATABASE_PASSWORD: str({
    default: 'password',
  }),
  DATABASE_NAME: str({
    default: 'falei',
  }),
  APP_PORT: port({
    default: 3000,
  }),
  JWT_SECRET: str({
    default: 'mamia',
  }),
});
