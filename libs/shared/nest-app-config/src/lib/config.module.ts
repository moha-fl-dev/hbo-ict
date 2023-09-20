import { Module } from '@nestjs/common';
import { NestAppConfig } from './config.service';

@Module({
  controllers: [],
  providers: [NestAppConfig],
  exports: [NestAppConfig],
})
export class ConfigModule {}
