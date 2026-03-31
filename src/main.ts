import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

const DEFAULT_CORS_ORIGINS = [
  'https://stock-pulse-ptt.vercel.app',
  'http://localhost:5173',
];

const sanitizeOrigins = (values: string[]): string[] =>
  values.map((entry) => entry.trim()).filter((entry) => entry.length > 0 && entry !== '*');

function parseCorsOrigins(): string[] {
  const raw = process.env.CORS_ORIGINS;
  if (!raw || !raw.trim()) return [...DEFAULT_CORS_ORIGINS];

  try {
    const value = raw.trim();

    if (value.startsWith('[')) {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) return [...DEFAULT_CORS_ORIGINS];

      const origins = sanitizeOrigins(parsed.map((entry) => String(entry)));
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
  app.use(helmet());

  app.enableCors({
    origin: parseCorsOrigins(),
    credentials: true,
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
bootstrap();
