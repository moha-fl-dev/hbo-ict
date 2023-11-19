import { Injectable } from '@nestjs/common';
import type { Employee, Prisma } from '@prisma/client/lingo';

import { PrismaService } from '@hbo-ict/lingo-prisma-client';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async upsert({ data }: Prisma.EmployeeCreateArgs) {
    const employee = await this.prisma.employee.upsert({
      create: data,
      update: data,
      where: {
        id: String(data.id),
      },
    });

    return employee;
  }

  async get({ where, include }: Prisma.EmployeeFindUniqueArgs) {
    const employee = await this.prisma.employee.findUnique({
      where,
      include,
    });

    return employee;
  }

  async all(): Promise<Employee[]> {
    const employees = await this.prisma.employee.findMany();

    return employees;
  }

  async update(payload: Prisma.EmployeeUpdateInput) {
    const employee = await this.prisma.employee.update({
      where: {
        id: String(payload.id),
      },
      data: payload,
    });

    return employee;
  }

  async delete({ where }: Prisma.EmployeeDeleteArgs) {
    const employee = await this.prisma.employee.delete({
      where,
    });

    return employee;
  }

  async getEmployeesByTeamId({ teamId }: { teamId: string }) {
    const employees = await this.prisma.employee.findMany({
      where: {
        teamId,
      },
    });

    return employees;
  }
}
