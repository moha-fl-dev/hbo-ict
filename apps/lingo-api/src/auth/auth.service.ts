import { NestAppConfig } from '@hbo-ict/config';
import type { ConfSchemType } from '@hbo-ict/lingo-utils';
import type { SignInDto, SignUpDto } from '@hbo-ict/lingo/types';
import { SupabaseService } from '@hbo-ict/supabase-auth';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthError } from '@supabase/supabase-js';

/**
 * the auth service.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: NestAppConfig<ConfSchemType>,
    private readonly supabaseService: SupabaseService,
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

  async me(token: string) {
    const client = await this.supabaseService.getAnonClient();

    const { data: user, error } = await client.auth.getUser(token);

    if (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }

    const { user: currentUser } = user;

    return {
      status: HttpStatus.ACCEPTED,
      email: currentUser.email,
    };
  }

  async refreshSession({ refresh_token }: { refresh_token: string }) {
    const client = await this.supabaseService.getAnonClient();

    const { data, error } = await client.auth.refreshSession({ refresh_token });

    if (error instanceof AuthError) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
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

  async resetPassword({ password, uuid }: { password: string; uuid: string }) {
    const client = await this.supabaseService.getAdminClient();

    const { error } = await client.updateUserById(uuid, {
      password,
    });

    if (error instanceof AuthError) {
      console.log({
        reset_password_error: error.message,
      });
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.ACCEPTED,
      message: 'Password reset',
    };
  }

  async signOut(jwt: string) {
    const client = await this.supabaseService.getAdminClient();

    const { data: _data, error } = await client.signOut(jwt, 'global');

    if (error instanceof AuthError) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }

    return {
      status: HttpStatus.ACCEPTED,
      message: 'User signed out',
    };
  }
}
