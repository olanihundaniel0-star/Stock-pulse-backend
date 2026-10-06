import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

// Canonical app roles (stored lowercase in Profile.role: 'admin' | 'user').
// `Roles()` keeps the `string[]` signature for back-compat (e.g.
// `@Roles('Admin')` still compiles); the guard normalizes case before
// comparing, so any casing matches.
export type AppRole = 'admin' | 'user';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
