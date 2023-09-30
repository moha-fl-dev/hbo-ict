import { SignInDto, SignUpDto } from '@hbo-ict/lingo/types';
import { SupabaseService } from '@hbo-ict/supabase-auth';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

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
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    const { session } = user;

    return {
      status: HttpStatus.ACCEPTED,
      message: 'User signed in',
      access_token: session!.access_token,
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
      expires_in: session!.expires_in,
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
