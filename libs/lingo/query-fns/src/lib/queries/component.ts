import type {
  ComponentWithTicketsCount,
  SingleNameFieldDto,
} from '@hbo-ict/lingo/types';
import type { Component } from '@prisma/client/lingo';
import { axiosInstance } from '../client/intance';

async function create(payload: SingleNameFieldDto) {
  const res = await axiosInstance.post<Component>('component/create', payload);

  return res.data;
}

async function getAll() {
  const res = await axiosInstance.get<ComponentWithTicketsCount[]>('component');

  return res.data;
}

async function getById(id: string) {
  const res = await axiosInstance.get<Component>(`component/${id}`);

  return res.data;
}

async function getComponentsByTeamId(teamId: string) {
  const res = await axiosInstance.get<Component[]>(
    `component/${teamId}/components`,
  );

  return res.data;
}

const component = {
  create,
  getAll,
  getById,
  getComponentsByTeamId,
};

export { component };
