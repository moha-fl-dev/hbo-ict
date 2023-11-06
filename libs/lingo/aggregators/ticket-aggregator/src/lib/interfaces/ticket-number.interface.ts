import { TicketNumber } from '@hbo-ict/lingo/types';
import { Prisma } from '@prisma/client/lingo';

export interface ITicketNumberService {
  createTicketNumber(): Promise<TicketNumber | null>;
  find({
    where,
    include,
  }: Prisma.TicketNumberFindUniqueArgs): Promise<TicketNumber>;
  verifyAndClaimTicketNumber({
    where,
    include,
  }: Prisma.TicketNumberFindUniqueArgs): Promise<TicketNumber | null>;
}
