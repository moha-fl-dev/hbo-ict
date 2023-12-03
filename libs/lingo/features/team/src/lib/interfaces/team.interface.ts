import type { Prisma, Team } from '@prisma/client/lingo';

export interface ITeamService {
  create(payload: Prisma.TeamCreateInput): Promise<Team>;
  all(): Promise<Team[]>;
  get({ where, include }: Prisma.TeamFindUniqueArgs): Promise<Team>;
  getTeamsByDepartmentId({
    departmentId,
  }: Prisma.TeamWhereInput): Promise<
    Array<Pick<Team, 'departmentId' | 'name' | 'id'>>
  >;
}
