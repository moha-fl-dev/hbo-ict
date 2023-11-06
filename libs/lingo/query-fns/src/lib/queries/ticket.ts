import {
  CreateTicketDto,
  TicketDefaultReturn,
  TicketFindManyArgs,
  TicketFindUniqueArgs,
} from '@hbo-ict/lingo/types';
import { axiosInstance } from '../client/intance';

export async function create(payload: CreateTicketDto) {
  const res = await axiosInstance.post('ticket/create', payload);
  return res.data;
}

export async function find({
  where,
  include,
}: TicketFindUniqueArgs): Promise<TicketDefaultReturn> {
  const res = await axiosInstance.get<TicketDefaultReturn>('ticket/find', {
    params: {
      where,
      include,
    },
  });
  return res.data;
}

async function update(payload: CreateTicketDto) {
  const res = await axiosInstance.post(
    `ticket/${payload.ticketNumber}/update`,
    payload
  );
  return res.data;
}

async function findMany(payload: TicketFindManyArgs) {
  const res = await axiosInstance.get<TicketDefaultReturn[]>('ticket/all', {
    params: payload,
  });
  return res.data;
}
export const ticket = {
  create,
  find,
  update,
  findMany,
};
