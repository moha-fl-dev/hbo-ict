import { Module } from '@nestjs/common';
import { ComponentController } from './component.controller';
import { ComponentService } from '@hbo-ict/data-access';

@Module({
  controllers: [ComponentController],
  providers: [ComponentService],
})
export class ComponentModule {}
