import { axiosInstance } from '../client/intance';

async function workspaceRoot() {
  const res = await axiosInstance.get('workspace');

  return res.data;
}

const workspace = {
  workspaceRoot,
};

export { workspace };
