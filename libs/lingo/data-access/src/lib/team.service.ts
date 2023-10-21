import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { Injectable } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client/lingo';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  create(payload: Prisma.TeamCreateInput): Promise<Team> {
    return this.prisma.team.create({
      data: payload,
    });
  }

  all(): Promise<Team[]> {
    return this.prisma.team.findMany();
  }
}
