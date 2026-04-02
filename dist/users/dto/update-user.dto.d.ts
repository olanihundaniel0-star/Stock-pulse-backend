declare const PROFILE_ROLES: readonly ["admin", "user"];
export declare class UpdateUserDto {
    name?: string;
    role?: (typeof PROFILE_ROLES)[number];
    status?: 'Active' | 'Inactive';
}
export {};
