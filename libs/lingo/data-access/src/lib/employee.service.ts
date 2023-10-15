import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, Employee } from '@prisma/client/lingo';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaClient) {}

  async create({ data }: Prisma.EmployeeCreateArgs) {
    const employee = await this.prisma.employee.create({
      data,
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
}
