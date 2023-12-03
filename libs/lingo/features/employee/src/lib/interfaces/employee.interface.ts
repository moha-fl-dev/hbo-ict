import type { Employee, Prisma } from '@prisma/client/lingo';

export interface IEmployeesService {
  upsert({ data }: Prisma.EmployeeCreateArgs): Promise<Employee>;
  get({ where, include }: Prisma.EmployeeFindUniqueArgs): Promise<Employee>;
  all(): Promise<Employee[]>;
  update(payload: Prisma.EmployeeUpdateInput): Promise<Employee>;
  delete({ where }: Prisma.EmployeeDeleteArgs): Promise<Employee>;
  getEmployeesByTeamId({ teamId }: { teamId: string }): Promise<Employee[]>;
}
