import { StatsService } from './stats.service';
type AuthenticatedRequest = {
    user: {
        companyId: string | null;
    };
};
export declare class StatsController {
    private readonly stats;
    constructor(stats: StatsService);
    dashboard(req: AuthenticatedRequest): Promise<import("./stats.service").DashboardStats>;
}
export {};
