"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
const DEFAULT_CORS_ORIGINS = [
    'https://stock-pulse-ptt.vercel.app',
    'http://localhost:5173',
];
const sanitizeOrigins = (values) => values.map((entry) => entry.trim()).filter((entry) => entry.length > 0 && entry !== '*');
function parseCorsOrigins() {
    const raw = process.env.CORS_ORIGINS;
    if (!raw || !raw.trim())
        return [...DEFAULT_CORS_ORIGINS];
    try {
        const value = raw.trim();
        if (value.startsWith('[')) {
            const parsed = JSON.parse(value);
            if (!Array.isArray(parsed))
                return [...DEFAULT_CORS_ORIGINS];
            const origins = sanitizeOrigins(parsed.map((entry) => String(entry)));
            return origins.length > 0 ? origins : [...DEFAULT_CORS_ORIGINS];
        }
        const origins = sanitizeOrigins(value.split(','));
        return origins.length > 0 ? origins : [...DEFAULT_CORS_ORIGINS];
    }
    catch {
        return [...DEFAULT_CORS_ORIGINS];
    }
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: parseCorsOrigins(),
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(Number(process.env.PORT ?? 3000), '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map