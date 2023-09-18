import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';
import { AppConfigService } from './app/app.config.service';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(AppConfigService);

  const { port } = configService;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
})();
