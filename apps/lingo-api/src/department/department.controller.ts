import { DepartmentService } from '@hbo-ict/data-access';
import { ZodValidate } from '@hbo-ict/lingo-utils';
import type { SingleNameFieldDto } from '@hbo-ict/lingo/types';
import { SingleNameFieldSchema } from '@hbo-ict/lingo/types';
import { Controller, Get, Param, Post, Req } from '@nestjs/common';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('/create')
  @ZodValidate<SingleNameFieldDto>(SingleNameFieldSchema)
  async create(@Req() req: { body: SingleNameFieldDto }) {
    console.log(req.body);
    return this.departmentService.create(req.body);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.departmentService.get({
      where: {
        id,
      },
    });
  }

  @Get()
  async getAll() {
    return this.departmentService.all();
  }
}
