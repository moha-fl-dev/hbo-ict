import { Module } from '@nestjs/common';
import { SupabaseStrategy } from './supabase/strategy/supabase.strategy';
import { SupabaseGuard } from './supabase/guard/supabase.guard';
import { NestAppConfig } from '@hbo-ict/config';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  controllers: [],
  providers: [NestAppConfig],
  exports: [SupabaseStrategy, SupabaseGuard, SupabaseService],
})
export class SupabaseAuthModule {}
