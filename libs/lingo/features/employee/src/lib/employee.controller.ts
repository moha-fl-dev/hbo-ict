import { ZodValidate } from '@hbo-ict/lingo-utils';
import type { AccountDto } from '@hbo-ict/lingo/types';
import { accountSchema } from '@hbo-ict/lingo/types';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import type { Prisma } from '@prisma/client/lingo';
import type { User } from '@supabase/supabase-js';
import type { Request } from 'express';
import { IEmployeesService } from './interfaces/employee.interface';
import { EMPLOYEE_SERVICE_TOKEN } from './tokens/employee.token';

@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject(EMPLOYEE_SERVICE_TOKEN)
    private readonly employeeService: IEmployeesService,
  ) {}

  @Post()
  @ZodValidate<AccountDto>(accountSchema)
  async create(@Body() payload: AccountDto, @Req() req: Request) {
    const user = req['user'] as User;

    const data = {
      email: user.email!,
      name: payload.name,
      id: user.id,
      Team: {
        connect: {
          id: payload.team.id,
        },
      },
    } satisfies Prisma.EmployeeCreateInput;

    const employee = await this.employeeService.upsert({
      data,
    });

    return employee;
  }

  @Get('/UserProfileExtended')
  async get(@Req() req: Request) {
    const user = req['user'] as User;

    const employee = await this.employeeService.get({
      where: {
        id: user.id,
      },
      include: {
        Team: true,
      },
    });

    return employee;
  }

  @Get('/all')
  async getAll() {
    const employees = await this.employeeService.all();

    return employees;
  }

  @Get(':teamId/allWithTeam')
  async getAllWithTeam(@Param('teamId') teamId: string) {
    const employees = await this.employeeService.getEmployeesByTeamId({
      teamId,
    });

    return employees;
  }
}
