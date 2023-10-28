import { TicketNumber } from '@hbo-ict/lingo/types';
import { axiosInstance } from '../client/intance';

async function create(): Promise<TicketNumber> {
  const res = await axiosInstance.get<TicketNumber>('ticket-number/create');

  return res.data;
}

export const ticketNumber = {
  create,
};
