import { Module } from '@nestjs/common';
import { DepartmentService as DepService } from './department.service';
import { TeamService } from './team.service';
import { ComponentService } from './component.service';
import { EmployeeService } from './employee.service';
import { TicketNumberService } from './ticketNumber.service';

@Module({
  controllers: [],
  providers: [
    DepService,
    TeamService,
    ComponentService,
    EmployeeService,
    TicketNumberService,
  ],
  exports: [
    DepService,
    TeamService,
    ComponentService,
    EmployeeService,
    TicketNumberService,
  ],
  imports: [],
})
export class DataAccessModule {}
