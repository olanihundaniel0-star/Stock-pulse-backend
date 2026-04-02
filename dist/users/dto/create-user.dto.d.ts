declare const PROFILE_ROLES: readonly ["admin", "user"];
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: (typeof PROFILE_ROLES)[number];
    status: 'Active' | 'Inactive';
}
export {};
