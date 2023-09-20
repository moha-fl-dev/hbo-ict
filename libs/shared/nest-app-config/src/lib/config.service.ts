import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NesAppConfig<confType> {
  constructor(private readonly confservice: ConfigService) {}

  get(key: keyof confType): string {
    return this.confservice.get(key as string) as string;
  }
}
