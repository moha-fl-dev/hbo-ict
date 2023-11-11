import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { QueryBooleanPipe } from '../pipes/queryBooleanPipe';

export const TransformInclude = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const include = request.query.include;

    const transformedInclude = new QueryBooleanPipe().transform(include, {
      type: 'query',
      metatype: Object,
      data: 'include',
    });

    return transformedInclude;
  },
);
