-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "isAvailableForPurchase" DROP NOT NULL,
ALTER COLUMN "isAvailableForPurchase" SET DEFAULT false;
