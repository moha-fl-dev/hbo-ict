import type { Component, Prisma } from '@prisma/client/lingo';

export interface IComponentService {
  create(data: Prisma.ComponentCreateInput): Promise<Component>;
  get({ where, include }: Prisma.ComponentFindUniqueArgs): Promise<Component>;
  getMany({
    where,
    include,
  }: Prisma.ComponentFindManyArgs): Promise<Component[]>;
  all(): Promise<Component[]>;
  update({ where, data }: Prisma.ComponentUpdateArgs): Promise<Component>;
  delete({ where }: Prisma.ComponentDeleteArgs): Promise<Component>;
}
