import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const allowedOrigins = new Set(
    (process.env.CORS_ORIGINS ?? 'http://localhost:5173,http://localhost:3000')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  );

  app.enableCors({
    origin: (origin, callback) => {
      // Allow non-browser clients (curl, server-to-server) with no Origin header.
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked origin: ${origin}`), false);
    },
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

  await app.listen(Number(process.env.PORT ?? 3000));
}
bootstrap();
