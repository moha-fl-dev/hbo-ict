import { LingoPrismaClientModule } from '@hbo-ict/lingo-prisma-client';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [LingoPrismaClientModule],
})
export class DataAccessModule {}
