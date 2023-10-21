import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from '@hbo-ict/data-access';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
