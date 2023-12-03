import { Module } from '@nestjs/common';
import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';
import { COMPONENT_SERVICE_TOKEN } from './tokens/component.token';

@Module({
  controllers: [ComponentController],

  providers: [
    {
      provide: COMPONENT_SERVICE_TOKEN,
      useClass: ComponentService,
    },
  ],

  exports: [COMPONENT_SERVICE_TOKEN],
})
export class ComponentModule {}
