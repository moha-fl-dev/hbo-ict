import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import type { Request } from 'express';

/**
 * token guard that checks if there is at least a refresh token
 * @returns true if there is a refresh token
 * @throws UnauthorizedException if there is no refresh token
 */
@Injectable()
export class TokensGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractRefreshTokenFromCookie(request);
    console.log({ location: 'Token gaurd', refresh_token: token });

    if (!token) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractRefreshTokenFromCookie(request: Request) {
    const refresh_token = request.signedCookies.refresh_token;

    return refresh_token;
  }
}
