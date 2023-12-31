import { Module } from '@nestjs/common';
import { SupabaseStrategy } from './supabase/strategy/supabase.strategy';
import { SupabaseGuard } from './supabase/guard/supabase.guard';
import { ConfigModule, NestAppConfig } from '@hbo-ict/config';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [],
  // controllers: [],
  providers: [NestAppConfig, SupabaseStrategy, SupabaseGuard, SupabaseService],
  exports: [SupabaseStrategy, SupabaseGuard, SupabaseService],
})
export class SupabaseAuthModule {}
