CREATE TABLE "Company" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "industry" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Profile" ADD COLUMN "companyId" UUID;
ALTER TABLE "Product" ADD COLUMN "companyId" UUID;
ALTER TABLE "Transaction" ADD COLUMN "companyId" UUID;

-- Create default company for existing data
INSERT INTO "Company" ("id", "name", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Default Company', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Company");

-- Assign existing profiles to default company
UPDATE "Profile"
SET "companyId" = (SELECT "id" FROM "Company" ORDER BY "createdAt" ASC LIMIT 1)
WHERE "companyId" IS NULL;

-- Assign existing products to default company
UPDATE "Product"
SET "companyId" = (SELECT "id" FROM "Company" ORDER BY "createdAt" ASC LIMIT 1)
WHERE "companyId" IS NULL;

-- Assign existing transactions to default company
UPDATE "Transaction"
SET "companyId" = (SELECT "id" FROM "Company" ORDER BY "createdAt" ASC LIMIT 1)
WHERE "companyId" IS NULL;

-- Make the first profile an admin
UPDATE "Profile" SET "role" = 'admin'
WHERE "id" = (SELECT "id" FROM "Profile" ORDER BY "createdAt" ASC LIMIT 1);

ALTER TABLE "Product" ALTER COLUMN "companyId" SET NOT NULL;
ALTER TABLE "Transaction" ALTER COLUMN "companyId" SET NOT NULL;

CREATE INDEX "Profile_companyId_idx" ON "Profile"("companyId");
CREATE INDEX "Product_companyId_idx" ON "Product"("companyId");
CREATE INDEX "Transaction_companyId_idx" ON "Transaction"("companyId");

ALTER TABLE "Profile"
ADD CONSTRAINT "Profile_companyId_fkey"
FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Product"
ADD CONSTRAINT "Product_companyId_fkey"
FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Transaction"
ADD CONSTRAINT "Transaction_companyId_fkey"
FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
