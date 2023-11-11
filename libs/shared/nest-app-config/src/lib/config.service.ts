import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';

/**
 * A generic service that provides access to the config.
 * can be used by any app/service to access the app and its config.
 * @param confservice - The config service.
 * @returns The config.
 * @typeParam confType - The type of the config(generic).
 *
 */
@Injectable()
export class NestAppConfig<confType> {
  constructor(private readonly confservice: ConfigService) {}

  get(key: keyof confType): string {
    return this.confservice.get(key as string) as string;
  }
}
