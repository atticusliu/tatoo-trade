/*
  Warnings:

  - You are about to drop the column `stripeConnectedAccountID` on the `User` table. All the data in the column will be lost.
  - Added the required column `authUserId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "stripeConnectedAccountID",
ADD COLUMN     "authUserId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "stripeConnectedAccountId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
