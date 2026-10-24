# StockPulse Backend

The backend REST API for **StockPulse**, a multi-tenant inventory management system designed for retailers and wholesalers. Built with NestJS, Prisma ORM, PostgreSQL, and Supabase.

---

## Tech Stack

- **Framework:** [NestJS](https://nestjs.com/) (Express)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [Supabase Auth](https://supabase.com/auth) (JWT & RBAC)
- **Validation & Security:** `class-validator`, `class-transformer`, `helmet`

---

## Features

- **Multi-Tenant Architecture:** Strict company-level isolation across products, inventory movements, and team members.
- **Role-Based Access Control:** Role hierarchy (`admin` and `user`) enforcing least-privilege access across resources.
- **Inventory & Catalog Management:** Product cataloging with SKU tracking, categorization, stock status filtering, and low-stock alerts.
- **Stock Movement Ledger:** Audited `STOCK_IN` and `STOCK_OUT` operations with reason tagging (`Sale`, `Damaged`, `Expired`, `Theft_Loss`, `Internal_Use`, `Sample_Giveaway`).
- **Dashboard & Analytics:** Real-time metrics including total items, low-stock alerts, cost/retail valuation, and daily sales trends.
- **Input Validation & Security:** Strict global validation pipes, origin sanitization, and security headers via Helmet.

---

## API Overview

All routes are prefixed with `/api` and require a valid Supabase Bearer token unless marked as public.

| Resource | Method | Path | Description | Access |
| :--- | :--- | :--- | :--- | :--- |
| **Health** | `GET` | `/api/health` | Health check endpoint | Public |
| **Auth / User** | `GET` | `/api/users/me` | Fetch authenticated user profile | Authenticated |
| | `PATCH` | `/api/users/me/avatar` | Update profile avatar URL | Authenticated |
| | `DELETE` | `/api/users/me/avatar` | Remove profile avatar | Authenticated |
| **Company** | `POST` | `/api/companies` | Register a new company workspace | Authenticated |
| | `GET` | `/api/companies/mine` | Get current user's company profile | Authenticated |
| | `PATCH` | `/api/companies/mine` | Update company profile details | Admin |
| **Products** | `GET` | `/api/products` | List and filter products (paginated) | User / Admin |
| | `GET` | `/api/products/:id` | Get product details by ID | User / Admin |
| | `POST` | `/api/products` | Create a new product | Admin |
| | `PATCH` | `/api/products/:id` | Update product details | Admin |
| | `DELETE` | `/api/products/:id` | Delete a product | Admin |
| **Transactions** | `GET` | `/api/transactions` | List transaction history (paginated) | User / Admin |
| | `POST` | `/api/transactions` | Record a stock-in or stock-out | User / Admin |
| **Dashboard** | `GET` | `/api/stats` | Aggregate dashboard metrics and charts | User / Admin |
| **Team** | `GET` | `/api/users` | List company team members | Admin |
| | `POST` | `/api/users` | Invite/create a team member | Admin |
| | `PATCH` | `/api/users/:id` | Update member role or status | Admin |
| | `DELETE` | `/api/users/:id` | Deactivate a team member | Admin |

---

## Environment Variables

Configure the following variables in your `.env` file:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string (pooled) | `postgresql://user:pass@host:5432/db?pgbouncer=true` |
| `DIRECT_URL` | Direct PostgreSQL connection string for migrations | `postgresql://user:pass@host:5432/db` |
| `SUPABASE_URL` | Supabase project API URL | `https://your-project.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase public anonymous key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (trusted server-side only) | `eyJhbGciOi...` |
| `PORT` | Application server port (default: `3000`) | `3000` |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated or JSON array) | `http://localhost:5173,https://your-app.com` |

---

## Getting Started

### Prerequisites

- Node.js `>= 20.19.0`
- PostgreSQL database
- Supabase project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/olanihundaniel0-star/Stock-pulse-backend.git
   cd Stock-pulse-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Populate the variables in .env
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```

5. Generate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

### Running the App

```bash
# Development mode with hot-reload
npm run dev

# Production build
npm run build

# Start production server
npm run start:prod
```

---

## Testing & Quality

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Run linter
npm run lint

# Format code
npm run format
```

---

## License

This project is licensed under the [MIT License](LICENSE).
