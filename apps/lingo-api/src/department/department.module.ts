import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from '@hbo-ict/data-access';

@Module({
  imports: [],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
