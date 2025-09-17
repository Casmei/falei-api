import { NestFactory } from '@nestjs/core';
// Import enviroments
import 'dotenv/config';

import { AppModule } from './app.module';
import { env } from './common/config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.APP_PORT);
}
bootstrap();
