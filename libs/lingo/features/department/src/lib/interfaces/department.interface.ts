import type { Department, Prisma } from '@prisma/client/lingo';
export interface IDepartmentService {
  create(data: Prisma.DepartmentCreateWithoutTeamsInput): Promise<Department>;
  get({ where, include }: Prisma.DepartmentFindUniqueArgs): Promise<Department>;
  all(): Promise<Department[]>;
  update(payload: Prisma.DepartmentUpdateInput): Promise<Department>;
  delete({ where }: Prisma.DepartmentDeleteArgs): Promise<Department>;
  getTeams({
    where,
    include,
  }: Prisma.DepartmentFindUniqueArgs): Promise<Department>;
  getTeamMembers({
    where,
    include,
  }: Prisma.DepartmentFindUniqueArgs): Promise<Department>;
  getByTeamId({
    where,
    include,
  }: Prisma.TeamFindUniqueArgs): Promise<Department>;
}
