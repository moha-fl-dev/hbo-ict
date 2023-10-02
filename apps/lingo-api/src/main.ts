import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { NestAppConfig } from '@hbo-ict/config';
import { ConfSchemType } from '@hbo-ict/lingo-utils';
import cookieParser from 'cookie-parser';


/**
 * The main function of the app.
 * @returns The app.
 */
(async () => {
  /**
   * Create the app.
   */
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /**
   * Configure the app.
   */
  const configService = app.get(NestAppConfig<ConfSchemType>);
  /**
   * append the cookie parser.
   */
  app.use(cookieParser(configService.get('SUPABASE_JWT_SECRET')));
  /**
   * Enable cors.
   */
  app.enableCors({
    origin: configService.get('NEXT_APP_ORIGIN'),
    credentials: true,
    methods: ['GET', 'POST','DELETE'],
  });

  
  /**
   * get the port from the config module.
   */
  const port = configService.get('PORT');
  /**
   * Start the app.
   */
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
})();
