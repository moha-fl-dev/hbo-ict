import { NestAppConfig } from '@hbo-ict/config';
import { ConfSchemType } from '@hbo-ict/lingo-utils';
import { SignInDto, SignUpDto } from '@hbo-ict/lingo/types';
import { SupabaseService } from '@hbo-ict/supabase-auth';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthError } from '@supabase/supabase-js';

/**
 * the auth service.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly configService: NestAppConfig<ConfSchemType>
  ) {}

  async signIn(payload: SignInDto) {
    const client = await this.supabaseService.getAnonClient();

    const { data: user, error } = await client.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    const { session } = user;

    return {
      status: HttpStatus.ACCEPTED,
      message: 'User signed in',
      access_token: session!.access_token,
      refresh_token: session!.refresh_token,
      expires_in: session!.expires_in,
    };
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
      access_token: session!.access_token,
      refresh_token: session!.refresh_token,
      expires_in: session!.expires_in,
    };
  }

  async me() {
    const client = await this.supabaseService.getAnonClient();

    const { data: user, error } = await client.auth.getUser();

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return null;
  }

  async refreshSession({ refresh_token }: { refresh_token: string }) {
    const client = await this.supabaseService.getAnonClient();

    const { data, error } = await client.auth.refreshSession({ refresh_token });

    if (error instanceof AuthError) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    const { session } = data;

    return {
      status: HttpStatus.ACCEPTED,
      message: 'Session refreshed',
      access_token: session!.access_token,
      refresh_token: session!.refresh_token,
      expires_in: session!.expires_in,
    };
  }
}
