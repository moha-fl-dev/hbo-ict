import { Module } from '@nestjs/common';
import { NesAppConfig } from './config.service';

@Module({
  controllers: [],
  providers: [NesAppConfig],
  exports: [NesAppConfig],
})
export class ConfigModule {}
