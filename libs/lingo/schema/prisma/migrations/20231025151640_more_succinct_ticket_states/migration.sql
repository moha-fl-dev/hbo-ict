/*
  Warnings:

  - The values [IN_PROGRESS,ON_HOLD] on the enum `TicketStatusEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TicketStatusEnum_new" AS ENUM ('OPEN', 'ACTIVE', 'HOLD', 'CLOSED');
ALTER TABLE "Ticket" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Ticket" ALTER COLUMN "status" TYPE "TicketStatusEnum_new" USING ("status"::text::"TicketStatusEnum_new");
ALTER TYPE "TicketStatusEnum" RENAME TO "TicketStatusEnum_old";
ALTER TYPE "TicketStatusEnum_new" RENAME TO "TicketStatusEnum";
DROP TYPE "TicketStatusEnum_old";
ALTER TABLE "Ticket" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;
