import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { Injectable } from '@nestjs/common';
import type { Prisma, Team } from '@prisma/client/lingo';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  create(payload: Prisma.TeamCreateInput): Promise<Team> {
    return this.prisma.team.create({
      data: payload,
    });
  }

  all(): Promise<Team[]> {
    return this.prisma.team.findMany({
      include: {
        _count: {
          select: {
            Tickets: true,
            components: true,
            members: true,
          },
        },
        members: true,
        components: true,
      },
    });
  }

  async get({ where, include }: Prisma.TeamFindUniqueArgs): Promise<Team> {
    const team = await this.prisma.team.findFirstOrThrow({
      where,
      include,
    });

    return team;
  }

  async getTeamsByDepartmentId({
    departmentId,
  }: Prisma.TeamWhereInput): Promise<
    Array<Pick<Team, 'departmentId' | 'name' | 'id'>>
  > {
    const res = await this.prisma.team.findMany({
      where: {
        departmentId,
      },
      select: {
        departmentId: true,
        name: true,
        id: true,
      },
    });

    return res;
  }
}
