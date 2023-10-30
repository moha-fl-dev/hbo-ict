/*
  Warnings:

  - You are about to drop the column `ticketNumber` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticketId` on the `TicketNumber` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ticketNumberId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ticketNumberId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TicketNumber" DROP CONSTRAINT "TicketNumber_ticketId_fkey";

-- DropIndex
DROP INDEX "Ticket_ticketNumber_key";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "ticketNumber",
ADD COLUMN     "ticketNumberId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "TicketNumber" DROP COLUMN "ticketId";

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticketNumberId_key" ON "Ticket"("ticketNumberId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_ticketNumberId_fkey" FOREIGN KEY ("ticketNumberId") REFERENCES "TicketNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
