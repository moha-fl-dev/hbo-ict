import { DepartmentService } from '@hbo-ict/data-access';
import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';

@Module({
  imports: [],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
