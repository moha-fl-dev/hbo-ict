import { Injectable } from '@nestjs/common';
import { Prisma, Comment } from '@prisma/client/lingo';
import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { ICommentService } from '../interfaces/comment.interface';

@Injectable()
export class CommentService implements ICommentService {
  constructor(private prismaservice: PrismaService) {}

  createComment(payload: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prismaservice.comment.create({ data: payload });
  }
}
