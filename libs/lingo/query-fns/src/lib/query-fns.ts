import { auth } from './queries/auth';
import { department } from './queries/department';
import { workspace } from './queries/workspace';
import { team } from './queries/team';
import { component } from './queries/component';
import { employee } from './queries/employee';
import { ticketNumber } from './queries/ticketNumber';

async function createDepartment(url: string) {}

const Api = {
  auth,
  workspace,
  department,
  team,
  component,
  employee,
  ticketNumber,
};

export { Api };
