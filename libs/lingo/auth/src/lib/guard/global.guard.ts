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

@Injectable({ scope: Scope.REQUEST })
export class GlobalGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private supabseService: SupabaseService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(isPublic);

    if (isPublic && isPublic !== undefined) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const client = await this.supabseService.getAnonClient();
      const {
        data: { user },
      } = await client.auth.getUser(token);

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
}
