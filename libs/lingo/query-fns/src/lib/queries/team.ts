import { SingleNameFieldDto } from '@hbo-ict/lingo/types';
import { axiosInstance } from '../client/intance';
import { Team } from '@prisma/client/lingo';

async function create(payload: SingleNameFieldDto) {
  const res = await axiosInstance.post<Team>('team/create', payload);

  return res.data;
}

async function getAll() {
  const res = await axiosInstance.get<Team[]>('team');

  return res.data;
}

const team = {
  create,
  getAll,
};

export { team };
