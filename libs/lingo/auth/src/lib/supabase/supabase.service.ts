import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { ExtractJwt } from 'passport-jwt';
import { NestAppConfig } from '@hbo-ict/config';
import { ConfSchemType } from '@hbo-ict/lingo-utils';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private anonClientInstance: SupabaseClient | null = null;
  private adminClientInstance: SupabaseClient | null = null;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: NestAppConfig<ConfSchemType>
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
              this.request
            )}`,
          },
        },
      }
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
        },
        global: {
          headers: {
            Authorization: `Bearer ${ExtractJwt.fromAuthHeaderAsBearerToken()(
              this.request
            )}`,
          },
        },
      }
    );
    return this.adminClientInstance.auth;
  }
}
