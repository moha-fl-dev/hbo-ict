import type { CommentFindManyArgs } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';
import { clauseHasProperty } from './utils';

export function useFindComment(args: CommentFindManyArgs) {
  const { data, isError, isLoading } = useQuery(
    ['comments', args],
    () => Api.comment.findMany(args),
    {
      enabled: clauseHasProperty<CommentFindManyArgs['where']>(args.where),
    },
  );

  return {
    comments: data,
    isError,
    isLoading,
  };
}
