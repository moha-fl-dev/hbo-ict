import { CreateTicketDto } from '@hbo-ict/lingo/types';
import { axiosInstance } from '../client/intance';

export async function create(payload: CreateTicketDto) {
  const res = await axiosInstance.post('ticket/create', payload);
  return res.data;
}

export const ticket = {
  create,
};
