import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';

@Injectable()
export class QueryBooleanPipe<T> implements PipeTransform {
  transform(value: Record<string, any>, metadata: ArgumentMetadata) {
    return this.transformStringToBoolean<T>(value as T);
  }

  private transformStringToBoolean<T>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.transformStringToBoolean(item)) as any;
    }

    let result: Record<string, any> = {};
    for (const key in obj) {
      const value = obj[key];
      if (value === 'true') {
        result[key] = true;
      } else if (value === 'false') {
        result[key] = false;
      } else {
        result[key] = this.transformStringToBoolean(value);
      }
    }

    return result as T;
  }
}
