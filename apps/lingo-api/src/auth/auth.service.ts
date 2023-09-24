import { SignInDto, SignUpDto } from '@hbo-ict/lingo/types';
import { SupabaseService } from '@hbo-ict/supabase-auth';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthError } from '@supabase/supabase-js';

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
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    const { session } = user;

    return {
      status: HttpStatus.CREATED,
      message: 'User created',
      session,
    };
  }

  async me(token: string) {
    const client = await this.supabaseService.getAnonClient();

    const { data: user, error } = await client.auth.getUser(token);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
