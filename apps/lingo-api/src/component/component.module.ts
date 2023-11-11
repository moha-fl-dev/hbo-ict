import { ComponentService } from '@hbo-ict/data-access';
import { Module } from '@nestjs/common';
import { ComponentController } from './component.controller';

@Module({
  controllers: [ComponentController],
  providers: [ComponentService],
})
export class ComponentModule {}
