import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class SeedService implements OnModuleInit {
    private readonly config;
    private readonly logger;
    constructor(config: ConfigService);
    onModuleInit(): Promise<void>;
}
