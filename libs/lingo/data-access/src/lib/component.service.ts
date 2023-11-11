import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client/lingo';

@Injectable()
export class ComponentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ComponentCreateInput) {
    const component = await this.prisma.component.create({
      data,
    });

    return component;
  }

  async get({ where, include }: Prisma.ComponentFindUniqueArgs) {
    const components = await this.prisma.component.findFirstOrThrow({
      where,
      include,
    });

    return components;
  }

  async getMany({ where, include }: Prisma.ComponentFindManyArgs) {
    const components = await this.prisma.component.findMany({
      where,
      include,
    });

    return components;
  }

  async all() {
    const components = await this.prisma.component.findMany();

    return components;
  }

  async update({ where, data }: Prisma.ComponentUpdateArgs) {
    const component = await this.prisma.component.update({
      where,
      data,
    });

    return component;
  }

  async delete({ where }: Prisma.ComponentDeleteArgs) {
    const component = await this.prisma.component.delete({
      where,
    });

    return component;
  }
}
