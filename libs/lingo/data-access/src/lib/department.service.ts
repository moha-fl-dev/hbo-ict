import type { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { Injectable } from '@nestjs/common';
import type { Prisma, Department } from '@prisma/client/lingo';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.DepartmentCreateWithoutTeamsInput) {
    const department = await this.prisma.department.create({
      data,
    });

    return department;
  }

  async get({ where, include }: Prisma.DepartmentFindUniqueArgs) {
    const department = await this.prisma.department.findUnique({
      where,
      include,
    });

    return department;
  }

  async all(): Promise<Department[]> {
    const departments = await this.prisma.department.findMany();

    return departments;
  }

  async update(payload: Prisma.DepartmentUpdateInput) {
    const department = await this.prisma.department.update({
      where: {
        id: String(payload.id),
      },
      data: payload,
    });

    return department;
  }

  async delete({ where }: Prisma.DepartmentDeleteArgs) {
    const department = await this.prisma.department.delete({
      where,
    });

    return department;
  }

  async getTeams({ where }: Prisma.DepartmentFindUniqueArgs) {
    const department = await this.prisma.department.findUnique({
      where,
      include: {
        teams: true,
      },
    });

    return department;
  }

  async getTeamMembers({ where }: Prisma.DepartmentFindUniqueArgs) {
    const department = await this.prisma.department.findUnique({
      where,
      include: {
        teams: {
          include: {
            members: true,
          },
        },
      },
    });

    return department;
  }

  async getByTeamId({ where }: Prisma.TeamFindUniqueArgs) {
    const department = await this.prisma.department.findFirst({
      where: {
        teams: {
          some: {
            id: where.id,
          },
        },
      },
    });

    return department;
  }
}
