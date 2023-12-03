import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TEAM_SERVICE_TOKEN } from './tokens/team.token';

@Module({
  controllers: [TeamController],
  providers: [
    {
      provide: TEAM_SERVICE_TOKEN,
      useClass: TeamService,
    },
  ],
  exports: [TEAM_SERVICE_TOKEN],
})
export class TeamModule {}
