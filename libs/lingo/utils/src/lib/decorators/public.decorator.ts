import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * decorator to mark a controller or endpoint as public
 *
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
