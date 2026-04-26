-- AlterTable: add avatarUrl column to Profile
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "avatarUrl" TEXT;
