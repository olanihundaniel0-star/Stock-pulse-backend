-- Breaking migration: User (cuid) replaced by Profile (UUID linked to Supabase auth).
-- Existing Transaction rows are removed because userId cannot map to auth user UUIDs.

DELETE FROM "Transaction";

ALTER TABLE "Transaction" DROP CONSTRAINT IF EXISTS "Transaction_userId_fkey";

ALTER TABLE "Transaction" DROP COLUMN IF EXISTS "userId";

DROP TABLE IF EXISTS "User";

DROP TYPE IF EXISTS "UserRole";

CREATE TABLE "Profile" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "status" TEXT NOT NULL DEFAULT 'Active',
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

ALTER TABLE "Transaction" ADD COLUMN "profileId" UUID NOT NULL;

CREATE INDEX "Transaction_profileId_date_idx" ON "Transaction"("profileId", "date");

ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;