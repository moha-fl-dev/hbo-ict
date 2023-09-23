import { SignInDto, SignUpDto } from '@hbo-ict/lingo-utils';
import { SupabaseService } from '@hbo-ict/supabase-auth';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signIn(payload: SignInDto) {
    const client = await this.supabaseService.getAnonClient();

    const { data: user, error } = await client.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      throw error;
    }

    return user;
  }

  async SignUp(payload: SignUpDto) {
    const client = await this.supabaseService.getAnonClient();

    const { data: user, error } = await client.auth.signUp({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      throw error;
    }

    return user;
  }

  async me(token: string) {
    const client = await this.supabaseService.getAnonClient();

    const { data: user, error } = await client.auth.getUser(token);

    if (error) {
      throw error;
    }

    return user;
  }
}
