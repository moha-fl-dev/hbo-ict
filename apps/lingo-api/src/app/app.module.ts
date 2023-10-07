import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config, validate } from '@hbo-ict/lingo-utils';
import { NestAppConfig } from '@hbo-ict/config';
import { GlobalGuard, SupabaseService } from '@hbo-ict/supabase-auth';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { WorkspaceModule } from '../workspace/workspace.module';
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
  ],
  controllers: [AppController],
  providers: [AppService, NestAppConfig, SupabaseService],
})
export class AppModule {}
