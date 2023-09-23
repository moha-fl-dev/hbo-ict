import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config, validate } from '@hbo-ict/lingo-utils';
import { NestAppConfig } from '@hbo-ict/config';
import { SupabaseService } from '@hbo-ict/supabase-auth';
import { AuthModule } from '../auth/auth.module';
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
  ],
  controllers: [AppController],
  providers: [AppService, NestAppConfig, SupabaseService],
})
export class AppModule {}
