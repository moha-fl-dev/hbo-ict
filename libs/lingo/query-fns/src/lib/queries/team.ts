import {
  SingleNameFieldDto,
  StrictTeamWithDepartment,
} from '@hbo-ict/lingo/types';
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

async function getById(id: string): Promise<StrictTeamWithDepartment> {
  const res = await axiosInstance.get<StrictTeamWithDepartment>(`team/${id}`);

  return res.data as StrictTeamWithDepartment;
}

const team = {
  create,
  getAll,
  getById,
};

export { team };
