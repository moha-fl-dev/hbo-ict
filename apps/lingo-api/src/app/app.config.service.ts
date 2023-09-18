import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfSchemType } from '../config/configuration';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<ConfSchemType>) {}

  get port(): number {
    return this.configService.get<number>('PORT');
  }
}
