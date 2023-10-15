import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client/lingo';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaClient) {}

  async create({ data }: Prisma.CommentCreateArgs) {
    const comment = await this.prisma.comment.create({
      data,
    });

    return comment;
  }

  async get({ where, include }: Prisma.CommentFindUniqueArgs) {
    const comments = await this.prisma.comment.findMany({
      where,
      include,
    });

    return comments;
  }

  async all({ where, include }: Prisma.CommentFindManyArgs) {
    const comments = await this.prisma.comment.findMany({
      where,
      include,
    });

    return comments;
  }
}
