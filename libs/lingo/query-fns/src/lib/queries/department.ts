import { SingleNameFieldDto } from '@hbo-ict/lingo/types';
import { axiosInstance } from '../client/intance';
import { Department } from '@prisma/client/lingo';

async function create(payload: SingleNameFieldDto) {
  const res = await axiosInstance.post<Department>(
    'department/create',
    payload
  );

  return res.data;
}

async function getAll() {
  const res = await axiosInstance.get('department');

  return res.data;
}

const department = {
  create,
  getAll,
};

export { department };
