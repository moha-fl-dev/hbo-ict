import { Module } from '@nestjs/common';
import { DepartmentService as DepService } from './department.service';
import { TeamService } from './team.service';

@Module({
  controllers: [],
  providers: [DepService, TeamService],
  exports: [DepService, TeamService],
  imports: [],
})
export class DataAccessModule {}
