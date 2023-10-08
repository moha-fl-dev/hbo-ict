import { IS_PUBLIC_KEY } from '@hbo-ict/lingo-utils';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { SupabaseService } from '../supabase/supabase.service';

/**
 * Global guard that checks if the user is authenticated
 * @returns true if the user is authenticated
 * @throws UnauthorizedException if the user is not authenticated
 */
@Injectable({ scope: Scope.REQUEST })
export class GlobalGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private supabseService: SupabaseService
  ) {}

  /**
   * Checks if the user is authenticated
   * @param context - The execution context
   * @returns true if the user is authenticated
   * @throws UnauthorizedException if the user is not authenticated
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic && isPublic !== undefined) {
      // undefined is also public????
      return true;
    }

    console.log(context.getHandler());

    const request = context.switchToHttp().getRequest();

    const { access_token, refresh_token } =
      this.extractTokenFromCookie(request);
    if (!access_token || !refresh_token) {
      throw new UnauthorizedException();
    }
    try {
      const client = await this.supabseService.getAnonClient();

      const {
        data: { user },
      } = await client.auth.getUser(access_token);

      if (!user) {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookie(request: Request) {
    return {
      refresh_token: request.signedCookies['refresh_token'],
      access_token: request.signedCookies['access_token'],
    };
  }
}
