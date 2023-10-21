import { TeamService } from '@hbo-ict/data-access';
import { ZodValidate } from '@hbo-ict/lingo-utils';
import {
  SingleNameFieldDto,
  SingleNameFieldSchema,
} from '@hbo-ict/lingo/types';
import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('/create')
  @ZodValidate<SingleNameFieldDto>(SingleNameFieldSchema)
  async create(@Req() req: { body: SingleNameFieldDto }) {
    console.log(req.body);
    return this.teamService.create(req.body);
  }

  @Get()
  async getAll() {
    return this.teamService.all();
  }
}
