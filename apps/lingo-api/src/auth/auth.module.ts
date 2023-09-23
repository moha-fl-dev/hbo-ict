import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseAuthModule, SupabaseService } from '@hbo-ict/supabase-auth';
import { ConfigModule } from '@hbo-ict/config';

@Module({
  imports: [SupabaseAuthModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, SupabaseService],
})
export class AuthModule {}
