import { SingleNameFieldDto, TeamWithDepartment } from '@hbo-ict/lingo/types';
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

async function getById(id: string): Promise<TeamWithDepartment> {
  const res = await axiosInstance.get<TeamWithDepartment>(`team/${id}`);

  return res.data as TeamWithDepartment;
}

const team = {
  create,
  getAll,
  getById,
};

export { team };
