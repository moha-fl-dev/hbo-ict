import { Inject, Injectable, Scope } from '@nestjs/common';
import type { Request } from 'express';
import { REQUEST } from '@nestjs/core';

import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

import { ExtractJwt } from 'passport-jwt';
import type { NestAppConfig } from '@hbo-ict/config';
import type { ConfSchemType } from '@hbo-ict/lingo-utils';

/**
 * A service that provides access to the supabase client.
 * will be used to access the app later on.
 * @param request - The request object.
 * @param configService - The config service.
 * @returns The supabase client.
 *
 */

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private anonClientInstance: SupabaseClient | null = null;
  private adminClientInstance: SupabaseClient['auth']['admin'] | null = null;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: NestAppConfig<ConfSchemType>,
  ) {}

  async getAnonClient() {
    if (this.anonClientInstance) {
      return this.anonClientInstance;
    }

    this.anonClientInstance = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_ANON_KEY'),
      {
        auth: {
          persistSession: false,
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
        global: {
          headers: {
            Authorization: `Bearer ${ExtractJwt.fromAuthHeaderAsBearerToken()(
              this.request,
            )}`,
          },
        },
      },
    );

    return this.anonClientInstance;
  }

  async getAdminClient() {
    if (this.adminClientInstance) {
      return this.adminClientInstance;
    }

    this.adminClientInstance = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_SERVICE_ROLE'),
      {
        auth: {
          persistSession: false,
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
        // global: {
        //   headers: {
        //     // Authorization: `Bearer ${ExtractJwt.fromAuthHeaderAsBearerToken()(
        //     //   this.request
        //     // )}`,

        //     Authorization: `Bearer ${
        //       // this.extractTokenFromCookie(this.request).access_token
        //       this.configService.get('SUPABASE_SERVICE_ROLE')
        //     }`,
        //   },
        // },
      },
    ).auth.admin;

    return this.adminClientInstance;
  }

  private extractTokenFromCookie(request: Request) {
    return {
      refresh_token: request.signedCookies['refresh_token'],
      access_token: request.signedCookies['access_token'],
    };
  }
}
