import { ComponentService } from '@hbo-ict/data-access';
import { ZodValidate } from '@hbo-ict/lingo-utils';
import {
  CreateComponentDto,
  SingleNameFieldDto,
  SingleNameFieldSchema,
  createComponentSchema,
} from '@hbo-ict/lingo/types';
import { Controller, Get, Param, Post, Req } from '@nestjs/common';

@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

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
}
