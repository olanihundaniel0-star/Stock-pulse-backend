-- DropIndex
DROP INDEX IF EXISTS "Product_sku_key";

-- CreateIndex
CREATE UNIQUE INDEX "Product_companyId_sku_key" ON "Product"("companyId", "sku");
