import { Controller, Get, Post, Req } from '@nestjs/common';
import { ZodValidate } from '@hbo-ict/lingo-utils';
import {
  SingleNameFieldDto,
  SingleNameFieldSchema,
} from '@hbo-ict/lingo/types';
import { DepartmentService } from '@hbo-ict/data-access';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('/create')
  @ZodValidate<SingleNameFieldDto>(SingleNameFieldSchema)
  async create(@Req() req: { body: SingleNameFieldDto }) {
    return this.departmentService.create(req.body);
  }

  @Get()
  async get() {
    return 'Departments';
  }
}
