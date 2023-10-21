import { Module } from '@nestjs/common';
import { DepartmentService as DepService } from './department.service';
import { TeamService } from './team.service';
import { ComponentService } from './component.service';

@Module({
  controllers: [],
  providers: [DepService, TeamService, ComponentService],
  exports: [DepService, TeamService, ComponentService],
  imports: [],
})
export class DataAccessModule {}
