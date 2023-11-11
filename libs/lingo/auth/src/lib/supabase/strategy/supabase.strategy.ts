import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { NestAppConfig } from '@hbo-ict/config';
import { ConfSchemType } from '@hbo-ict/lingo-utils';
import { SupabaseService } from '../supabase.service';
import { Request } from 'express';

/**
 * A strategy that checks if the user is authenticated. *
 */

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: NestAppConfig<ConfSchemType>,
    private readonly supabaseService: SupabaseService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SUPABASE_JWT_SECRET'),
    });
  }

  /**
   * Validate the given payload.
   *
   * @param payload - The payload to validate.
   * @returns The payload.
   */
  async validate(payload: any) {
    const client = await this.supabaseService.getAnonClient();

    try {
      const { data: user, error } = await client.auth.getUser(
        payload.access_token,
      );

      return payload;
    } catch (err) {
      return null;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
