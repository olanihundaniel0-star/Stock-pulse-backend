"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseModule = exports.SUPABASE_ADMIN = exports.SUPABASE_ANON = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
exports.SUPABASE_ANON = 'SUPABASE_ANON_CLIENT';
exports.SUPABASE_ADMIN = 'SUPABASE_ADMIN_CLIENT';
function createAnonClient(config) {
    const url = config.getOrThrow('SUPABASE_URL');
    const key = config.getOrThrow('SUPABASE_ANON_KEY');
    return (0, supabase_js_1.createClient)(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
}
function createAdminClient(config) {
    const url = config.getOrThrow('SUPABASE_URL');
    const key = config.getOrThrow('SUPABASE_SERVICE_ROLE_KEY');
    return (0, supabase_js_1.createClient)(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
}
let SupabaseModule = class SupabaseModule {
};
exports.SupabaseModule = SupabaseModule;
exports.SupabaseModule = SupabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: exports.SUPABASE_ANON,
                useFactory: createAnonClient,
                inject: [config_1.ConfigService],
            },
            {
                provide: exports.SUPABASE_ADMIN,
                useFactory: createAdminClient,
                inject: [config_1.ConfigService],
            },
        ],
        exports: [exports.SUPABASE_ANON, exports.SUPABASE_ADMIN],
    })
], SupabaseModule);
//# sourceMappingURL=supabase.module.js.map