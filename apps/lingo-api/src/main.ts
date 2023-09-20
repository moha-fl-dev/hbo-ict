import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { NestAppConfig } from '@hbo-ict/config';
import { ConfSchemType } from '@hbo-ict/lingo-utils';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(NestAppConfig<ConfSchemType>);
  const port = configService.get('PORT');
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
})();
