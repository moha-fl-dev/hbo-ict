import { NestAppConfig } from '@hbo-ict/config';
import { LingoPrismaClientModule } from '@hbo-ict/lingo-prisma-client';
import { config, validate } from '@hbo-ict/lingo-utils';
import { CommentModule } from '@hbo-ict/lingo/features/comment';
import { DepartmentModule } from '@hbo-ict/lingo/features/department';
import { TicketModule } from '@hbo-ict/lingo/features/ticket';
import { TicketNumberModule } from '@hbo-ict/lingo/features/ticketNumber';
import { SupabaseService } from '@hbo-ict/supabase-auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { ComponentModule } from '../component/component.module';
import { EmployeeModule } from '../employee/employee.module';
import { TeamModule } from '../team/team.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    CommentModule,
    LingoPrismaClientModule,
  ],
  controllers: [AppController],
  providers: [AppService, NestAppConfig, SupabaseService],
})
export class AppModule {}
