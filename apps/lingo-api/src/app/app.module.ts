import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config, validate } from '@hbo-ict/lingo-utils';
import { NestAppConfig } from '@hbo-ict/config';
import { SupabaseService } from '@hbo-ict/supabase-auth';
import { AuthModule } from '../auth/auth.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { DepartmentModule } from '../department/department.module';
import { LingoPrismaClientModule } from '@hbo-ict/lingo-prisma-client';
import { TeamModule } from '../team/team.module';
import { ComponentModule } from '../component/component.module';
import { EmployeeModule } from '../employee/employee.module';
import { TicketNumberModule } from '@hbo-ict/lingo/features/ticketNumber';
import { TicketModule } from '@hbo-ict/lingo/features/ticket';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [config],
      validate,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    AuthModule,
    WorkspaceModule,
    DepartmentModule,
    TeamModule,
    ComponentModule,
    EmployeeModule,
    TicketModule,
    TicketNumberModule,
    LingoPrismaClientModule,
  ],
  controllers: [AppController],
  providers: [AppService, NestAppConfig, SupabaseService],
})
export class AppModule {}
