import { NestAppConfig } from '@hbo-ict/config';
import { LingoPrismaClientModule } from '@hbo-ict/lingo-prisma-client';
import { config, validate } from '@hbo-ict/lingo-utils';
import { CommentModule } from '@hbo-ict/lingo/features/comment';
import { ComponentModule } from '@hbo-ict/lingo/features/component';
import { DepartmentModule } from '@hbo-ict/lingo/features/department';
import { EmployeeModule } from '@hbo-ict/lingo/features/employee';
import { TeamModule } from '@hbo-ict/lingo/features/team';
import { TicketModule } from '@hbo-ict/lingo/features/ticket';
import { TicketNumberModule } from '@hbo-ict/lingo/features/ticketNumber';
import { SupabaseService } from '@hbo-ict/supabase-auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
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
