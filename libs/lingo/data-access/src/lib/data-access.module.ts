import { Module } from '@nestjs/common';
import { DepartmentService as DepService } from './department.service';

@Module({
  controllers: [],
  providers: [DepService],
  exports: [DepService],
  imports: [],
})
export class DataAccessModule {}
