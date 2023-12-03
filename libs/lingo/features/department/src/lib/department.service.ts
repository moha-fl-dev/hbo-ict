import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { Injectable } from '@nestjs/common';
import type { Department, Prisma } from '@prisma/client/lingo';
import { IDepartmentService } from './interfaces/department.interface';

@Injectable()
export class DepartmentService implements IDepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.DepartmentCreateWithoutTeamsInput) {
    const department = await this.prisma.department.create({
      data,
    });

    return department;
  }

  async get({
    where,
    include,
  }: Prisma.DepartmentFindUniqueArgs): Promise<Department> {
    const department = await this.prisma.department.findUnique({
      where,
      include,
    });

    if (!department) {
      throw new Error('Department not found');
    }

    return department;
  }

  async all(): Promise<Department[]> {
    const departments = await this.prisma.department.findMany({
      include: {
        teams: {
          include: {
            _count: {
              select: {
                Tickets: true,
              },
            },
          },
        },
        _count: {
          select: {
            teams: true,
          },
        },
      },
    });

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

    if (!department) {
      throw new Error('Department not found');
    }

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

    if (!department) {
      throw new Error('Department not found');
    }

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

    if (!department) {
      throw new Error('Department not found');
    }

    return department;
  }
}
