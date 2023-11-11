import type { Prisma, Comment } from '@prisma/client/lingo';

export interface ICommentService {
  createComment(payload: Prisma.CommentCreateInput): Promise<Comment>;
  findMany(args: Prisma.CommentFindManyArgs): Promise<Comment[]>;
}
