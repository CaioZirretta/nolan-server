/*
  Warnings:

  - You are about to drop the column `sits` on the `rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "sits";

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "sits" TEXT[];
