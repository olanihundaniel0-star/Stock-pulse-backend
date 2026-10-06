import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Marks a route (or controller) as public, skipping global auth guards.
 * Used for `GET /api/health` so orchestrators can probe without a token.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
