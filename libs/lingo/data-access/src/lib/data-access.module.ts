import { Module } from '@nestjs/common';
import { DepartmentService as DepService } from './department.service';
import { TeamService } from './team.service';
import { ComponentService } from './component.service';
import { EmployeeService } from './employee.service';

@Module({
  controllers: [],
  providers: [DepService, TeamService, ComponentService, EmployeeService],
  exports: [DepService, TeamService, ComponentService, EmployeeService],
  imports: [],
})
export class DataAccessModule {}
