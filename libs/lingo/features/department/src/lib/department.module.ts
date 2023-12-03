import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DEPARTMENT_SERVICE_TOKEN } from './tokens/department.token';

@Module({
  controllers: [DepartmentController],
  providers: [
    {
      provide: DEPARTMENT_SERVICE_TOKEN,
      useClass: DepartmentService,
    },
  ],
  exports: [DEPARTMENT_SERVICE_TOKEN],
})
export class DepartmentModule {}
