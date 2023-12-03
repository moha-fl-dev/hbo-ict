import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EMPLOYEE_SERVICE_TOKEN } from './tokens/employee.token';

@Module({
  controllers: [EmployeeController],

  providers: [
    {
      provide: EMPLOYEE_SERVICE_TOKEN,
      useClass: EmployeeService,
    },
  ],

  exports: [EMPLOYEE_SERVICE_TOKEN],
})
export class EmployeeModule {}
