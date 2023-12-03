import { ZodValidate } from '@hbo-ict/lingo-utils';
import type {
  CreateComponentDto,
  SingleNameFieldDto,
} from '@hbo-ict/lingo/types';
import {
  SingleNameFieldSchema,
  createComponentSchema,
} from '@hbo-ict/lingo/types';
import { Controller, Get, Inject, Param, Post, Req } from '@nestjs/common';
import { IComponentService } from './interfaces/component.interface';
import { COMPONENT_SERVICE_TOKEN } from './tokens/component.token';

@Controller('component')
export class ComponentController {
  constructor(
    @Inject(COMPONENT_SERVICE_TOKEN)
    private readonly componentService: IComponentService,
  ) {}

  @Post('/create')
  @ZodValidate<CreateComponentDto>(createComponentSchema)
  async create(@Req() req: { body: CreateComponentDto }) {
    console.log(req.body);
    return this.componentService.create({
      name: req.body.name,
      Team: {
        connect: {
          id: req.body.team.id,
        },
      },
    });
  }

  @Post('/connect')
  @ZodValidate<SingleNameFieldDto>(SingleNameFieldSchema)
  async connect(@Req() req: { body: SingleNameFieldDto }) {
    console.log(req.body);
    return 'this.componentService.connect(req.body);';
  }

  @Get()
  async getAll() {
    return this.componentService.all();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.componentService.get({
      where: {
        id,
      },
      include: { Team: true },
    });
  }

  @Get('/:teamId/components')
  async createComponent(@Param('teamId') teamId: string) {
    const components = await this.componentService.getMany({
      where: {
        teamId,
      },
    });

    return components;
  }
}
