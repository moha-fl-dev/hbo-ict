import { auth } from './queries/auth';
import { department } from './queries/department';
import { workspace } from './queries/workspace';

async function createDepartment(url: string) {}

const Api = {
  auth,
  workspace,
  department,
};

export { Api };
