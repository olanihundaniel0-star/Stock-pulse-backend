import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuardModule } from './auth/auth-guard.module';
import { RolesGuard } from './auth/roles.guard';
import { SupabaseAuthGuard } from './auth/supabase-auth.guard';
import { CompaniesModule } from './companies/companies.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { SeedService } from './seed/seed.service';
import { SupabaseModule } from './supabase/supabase.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SupabaseModule,
    AuthGuardModule,
    UsersModule,
    ProductsModule,
    TransactionsModule,
    StatsModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  // Global fail-closed auth: every route requires a valid Supabase token
  // (SupabaseAuthGuard) + role check (RolesGuard) unless marked @Public().
  // Existing per-controller @UseGuards() stay as-is (harmless duplicate).
  // GET /api/health is @Public() so the Dockerfile HEALTHCHECK works.
  providers: [
    AppService,
    SeedService,
    { provide: APP_GUARD, useClass: SupabaseAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
