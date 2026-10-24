import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

const DEFAULT_CORS_ORIGINS = [
  'https://stock-pulse-ptt.vercel.app',
  'http://localhost:5173',
];

const sanitizeOrigins = (values: string[]): string[] =>
  values
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0 && entry !== '*');

function parseCorsOrigins(): string[] {
  const raw = process.env.CORS_ORIGINS;
  if (!raw || !raw.trim()) return [...DEFAULT_CORS_ORIGINS];

  try {
    const value = raw.trim();

    if (value.startsWith('[')) {
      const parsed: unknown = JSON.parse(value);
      if (!Array.isArray(parsed)) return [...DEFAULT_CORS_ORIGINS];

      const origins = sanitizeOrigins(
        (parsed as unknown[]).map((entry) => String(entry)),
      );
      return origins.length > 0 ? origins : [...DEFAULT_CORS_ORIGINS];
    }

    const origins = sanitizeOrigins(value.split(','));
    return origins.length > 0 ? origins : [...DEFAULT_CORS_ORIGINS];
  } catch {
    return [...DEFAULT_CORS_ORIGINS];
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // NOTE: behind Railway/proxies, Express `req.ip` / rate-limit keys only
  // reflect the real client IP if trust proxy is enabled. Kept conservative:
  // enable only when behind a known proxy (default true on Railway).
  // app.getHttpAdapter().getInstance().set('trust proxy', 1);
  app.use(helmet());

  app.enableCors({
    origin: parseCorsOrigins(),
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(Number(process.env.PORT ?? 3000), '0.0.0.0');
}
void bootstrap();
