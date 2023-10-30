import { TicketNumbeFindUniqueArgs, TicketNumber } from '@hbo-ict/lingo/types';
import { axiosInstance } from '../client/intance';

async function create(): Promise<TicketNumber> {
  const res = await axiosInstance.get<TicketNumber>('ticket-number/create');

  return res.data;
}

export async function find({
  where,
  include,
}: TicketNumbeFindUniqueArgs): Promise<TicketNumber> {
  const res = await axiosInstance.get<TicketNumber>('ticket-number/find', {
    params: {
      where,
      include,
    },
  });

  return res.data;
}

export const ticketNumber = {
  create,
  find,
};
