import { ZodValidate } from '@hbo-ict/lingo-utils';
import type { CreateTeamDto } from '@hbo-ict/lingo/types';
import { createTeamSchema } from '@hbo-ict/lingo/types';
import { Controller, Get, Inject, Param, Post, Req } from '@nestjs/common';
import { ITeamService } from './interfaces/team.interface';
import { TEAM_SERVICE_TOKEN } from './tokens/team.token';

@Controller('team')
export class TeamController {
  constructor(
    @Inject(TEAM_SERVICE_TOKEN) private readonly teamService: ITeamService,
  ) {}

  @Post('/create')
  @ZodValidate<CreateTeamDto>(createTeamSchema)
  async create(@Req() req: { body: CreateTeamDto }) {
    console.log(req.body);
    return this.teamService.create({
      name: req.body.name,
      Department: {
        connect: {
          id: req.body.department.id,
        },
      },
    });
  }

  @Get()
  async getAll() {
    return this.teamService.all();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const res = await this.teamService.get({
      where: { id },
      include: {
        Department: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return res;
  }

  @Get(':departmentId/teams')
  async getTeamsByDepartment(@Param('departmentId') departmentId: string) {
    return this.teamService.getTeamsByDepartmentId({
      departmentId,
    });
  }
}