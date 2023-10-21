import { auth } from './queries/auth';
import { department } from './queries/department';
import { workspace } from './queries/workspace';
import { team } from './queries/team';

async function createDepartment(url: string) {}

const Api = {
  auth,
  workspace,
  department,
  team,
};

export { Api };
