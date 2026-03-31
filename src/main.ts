import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

function parseCorsOrigins(): string[] {
  const raw = process.env.CORS_ORIGINS ?? '';
  const parsed = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (parsed.length > 0) return parsed;

  // Safe defaults for local development only; no wildcard fallback
  return [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ];
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
