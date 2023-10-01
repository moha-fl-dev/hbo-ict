import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, NestAppConfig } from '@hbo-ict/config';
import {
  GlobalGuard,
  SupabaseAuthModule,
  SupabaseStrategy,
} from '@hbo-ict/supabase-auth';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfSchemType } from '@hbo-ict/lingo-utils';

@Module({
  imports: [
    SupabaseAuthModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: NestAppConfig<ConfSchemType>) => {
        return {
          secret: configService.get('SUPABASE_JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
      inject: [NestAppConfig],
    }),
  ],
  controllers: [AuthController],
  providers: [
    SupabaseStrategy,
    ConfigModule,
    AuthService,
    NestAppConfig,
    {
      provide: APP_GUARD,
      useClass: GlobalGuard,
    },
  ],
})
export class AuthModule {}
