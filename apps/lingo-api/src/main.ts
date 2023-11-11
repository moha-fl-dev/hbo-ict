import { NestAppConfig } from '@hbo-ict/config';
import type { ConfSchemType } from '@hbo-ict/lingo-utils';
import type { NestApplicationOptions } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app/app.module';

/**
 * The main function of the app.
 * @returns The app.
 */
(async () => {
  /**
   * The https options.
   * makes it possible to use secure cookies.
   * neccesary for the refresh token.
   * not sure if this will make it to production or should make it to production.
   */
  const httpsOptions: NestApplicationOptions['httpsOptions'] = {
    key: fs.readFileSync(path.join(__dirname, '../../../localhost-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../../localhost.pem')),
  };

  /**
   * Create the app.
   */
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });

  /**
   * Configure the app.
   */
  const configService = app.get(NestAppConfig<ConfSchemType>);

  /**
   * append the cookie parser.
   * sign the cookie with the jwt secret.
   */
  app.use(cookieParser(configService.get('SUPABASE_JWT_SECRET')));

  /**
   * Enable cors.
   */
  app.enableCors({
    origin: configService.get('NEXT_APP_ORIGIN'),
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'noAuth'],
  });

  /**
   * get the port from the config module.
   */
  const port = configService.get('PORT');

  /**
   * Start the app.
   */
  app
    .listen(port)
    .then(() => {
      Logger.log(`🚀 Application is running on: https://localhost:${port}`);
    })
    .catch((err) => {
      Logger.error(err);
    });
})();
