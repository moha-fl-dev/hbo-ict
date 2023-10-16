import { SingleNameFieldDto } from '@hbo-ict/lingo/types';
import { axiosInstance } from '../client/intance';

async function create(payload: SingleNameFieldDto) {
  const res = await axiosInstance.post('workspace', payload);

  return res.data;
}

async function get() {
  const res = await axiosInstance.get('department');

  return res.data;
}

const department = {
  create,
};

export { department };
