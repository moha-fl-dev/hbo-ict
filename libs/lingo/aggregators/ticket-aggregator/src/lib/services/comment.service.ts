import { Injectable } from '@nestjs/common';
import type { Prisma, Comment } from '@prisma/client/lingo';
import type { PrismaService } from '@hbo-ict/lingo-prisma-client';
import type { ICommentService } from '../interfaces/comment.interface';
import type { DefaultArgs } from '@prisma/client/lingo/runtime/library';

@Injectable()
export class CommentService implements ICommentService {
  constructor(private prismaservice: PrismaService) {}

  findMany(args: Prisma.CommentFindManyArgs<DefaultArgs>): Promise<Comment[]> {
    return this.prismaservice.comment.findMany(args);
  }

  createComment(payload: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prismaservice.comment.create({ data: payload });
  }
}
