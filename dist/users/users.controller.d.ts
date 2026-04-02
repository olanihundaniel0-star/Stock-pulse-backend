import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
type AuthenticatedRequest = {
    user: {
        userId: string;
        companyId: string | null;
    };
};
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    me(req: {
        user: {
            userId: string;
        };
    }): Promise<{
        success: boolean;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            status: string;
            lastLogin: string | undefined;
            companyId: string | null;
        };
    }>;
    private requireCompanyId;
    list(req: AuthenticatedRequest): Promise<{
        id: string;
        name: string;
        email: string;
        role: string;
        status: string;
        lastLogin: string | undefined;
        companyId: string | null;
    }[]>;
    create(req: AuthenticatedRequest, dto: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        role: string;
        status: string;
        lastLogin: string | undefined;
        companyId: string | null;
    }>;
    update(req: AuthenticatedRequest, id: string, dto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        role: string;
        status: string;
        lastLogin: string | undefined;
        companyId: string | null;
    }>;
    remove(req: AuthenticatedRequest, id: string): Promise<{
        ok: boolean;
    }>;
}
export {};
