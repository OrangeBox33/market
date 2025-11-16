/*
  Warnings:

  - The `deliveryMethod` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EDeliveryMethod" AS ENUM ('pickup', 'courier');

-- AlterEnum
ALTER TYPE "EOrderStatus" ADD VALUE 'shipped';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" JSONB,
DROP COLUMN "deliveryMethod",
ADD COLUMN     "deliveryMethod" "EDeliveryMethod" NOT NULL DEFAULT 'pickup';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "addresses" JSONB NOT NULL DEFAULT '[]';
