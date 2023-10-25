/*
  Warnings:

  - You are about to drop the column `currentNumber` on the `TicketNumber` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `TicketNumber` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `TicketNumber` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `TicketNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TicketNumber` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TicketNumber_currentNumber_key";

-- AlterTable
ALTER TABLE "TicketFollower" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TicketNumber" DROP COLUMN "currentNumber",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "ticketId" UUID,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "TicketNumber_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "TicketNumber_id_key" ON "TicketNumber"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TicketNumber_number_key" ON "TicketNumber"("number");

-- AddForeignKey
ALTER TABLE "TicketNumber" ADD CONSTRAINT "TicketNumber_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
