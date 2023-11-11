import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { Injectable } from '@nestjs/common';
import type { Comment, Prisma } from '@prisma/client/lingo';
import type { DefaultArgs } from '@prisma/client/lingo/runtime/library';
import type { ICommentService } from '../interfaces/comment.interface';

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
