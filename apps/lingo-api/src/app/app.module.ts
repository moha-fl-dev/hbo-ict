import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config, { validate } from '../config/configuration';
import { AppConfigService } from './app.config.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [config],
      validate,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
