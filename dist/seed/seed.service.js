"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let SeedService = SeedService_1 = class SeedService {
    config;
    logger = new common_1.Logger(SeedService_1.name);
    constructor(config) {
        this.config = config;
    }
    async onModuleInit() {
        const seed = String(this.config.get('SEED_DEMO_USERS') ?? '').toLowerCase();
        if (['1', 'true', 'yes', 'on'].includes(seed)) {
            this.logger.warn('SEED_DEMO_USERS is set but demo seed was removed. Create users via Supabase Auth (sign-up or dashboard), then sign in so a Profile row is created.');
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SeedService);
//# sourceMappingURL=seed.service.js.map