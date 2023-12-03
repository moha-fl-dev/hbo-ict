import { ConfigModule, NestAppConfig } from '@hbo-ict/config';
import type { ConfSchemType } from '@hbo-ict/lingo-utils';
import {
  GlobalGuard,
  SupabaseAuthModule,
  SupabaseStrategy,
  TokensGuard,
} from '@hbo-ict/supabase-auth';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
    TokensGuard,
    {
      provide: APP_GUARD,
      useClass: GlobalGuard,
    },
  ],
})
export class AuthModule {}
