import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SupabaseStrategy } from '../strategy/supabase.strategy';

@Injectable()
export class SupabaseGuard extends AuthGuard('jwt') {
  constructor(private readonly supabaseStrategy: SupabaseStrategy) {
    super();
  }
}
