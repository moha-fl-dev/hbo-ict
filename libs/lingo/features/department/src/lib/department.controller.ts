import { ZodValidate } from '@hbo-ict/lingo-utils';
import type { SingleNameFieldDto } from '@hbo-ict/lingo/types';
import { SingleNameFieldSchema } from '@hbo-ict/lingo/types';
import { Controller, Get, Inject, Param, Post, Req } from '@nestjs/common';
import { IDepartmentService } from './interfaces/department.interface';
import { DEPARTMENT_SERVICE_TOKEN } from './tokens/department.token';

@Controller('department')
export class DepartmentController {
  constructor(
    @Inject(DEPARTMENT_SERVICE_TOKEN)
    private readonly departmentService: IDepartmentService,
  ) {}

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
