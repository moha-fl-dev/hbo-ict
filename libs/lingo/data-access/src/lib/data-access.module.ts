import { Module } from '@nestjs/common';
import { DepartmentService as DepService } from './department.service';
import { TeamService } from './team.service';
import { ComponentService } from './component.service';
import { EmployeeService } from './employee.service';
import { TicketNumberService } from './ticketNumber.service';
import { TicketService } from './ticket.service';

@Module({
  controllers: [],
  providers: [
    DepService,
    TeamService,
    ComponentService,
    EmployeeService,
    TicketNumberService,
    TicketService,
  ],
  exports: [
    DepService,
    TeamService,
    ComponentService,
    EmployeeService,
    TicketNumberService,
    TicketService,
  ],
  imports: [],
})
export class DataAccessModule {}
