import {
  CommentDefaultReturn,
  CommentFindManyArgs,
  CommentType,
  CreateCommentDto,
} from '@hbo-ict/lingo/types';
import { axiosInstance } from '../client/intance';

async function create(
  payload: CreateCommentDto & { ticketNumber: string },
): Promise<CommentType> {
  const res = await axiosInstance.post<CommentType>('/comment/create', payload);
  return res.data;
}

async function findMany(
  args: CommentFindManyArgs,
): Promise<CommentDefaultReturn[]> {
  const res = await axiosInstance.get<CommentDefaultReturn[]>('/comment/all', {
    params: args,
  });
  return res.data;
}

export const comment = {
  create,
  findMany,
};
