import { Module } from '@nestjs/common';
import { SupabaseStrategy } from './supabase/strategy/supabase.strategy';
import { SupabaseGuard } from './supabase/guard/supabase.guard';
import { ConfigModule } from '@hbo-ict/config';
import { SupabaseService } from './supabase/supabase.service';
import { GlobalGuard } from './guard/global.guard';
import { TokensGuard } from './guard/tokens.guard';

@Module({
  imports: [ConfigModule],
  // controllers: [],
  providers: [
    SupabaseStrategy,
    SupabaseGuard,
    SupabaseService,
    GlobalGuard,
    SupabaseService,
    TokensGuard,
  ],
  exports: [
    SupabaseStrategy,
    SupabaseGuard,
    SupabaseService,
    GlobalGuard,
    TokensGuard,
  ],
})
export class SupabaseAuthModule {}
