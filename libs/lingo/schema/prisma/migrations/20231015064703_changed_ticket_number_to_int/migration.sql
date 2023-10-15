/*
  Warnings:

  - The `currentNumber` column on the `TicketNumber` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TicketNumber" DROP COLUMN "currentNumber",
ADD COLUMN     "currentNumber" INTEGER NOT NULL DEFAULT 1000000000;

-- CreateIndex
CREATE UNIQUE INDEX "TicketNumber_currentNumber_key" ON "TicketNumber"("currentNumber");
