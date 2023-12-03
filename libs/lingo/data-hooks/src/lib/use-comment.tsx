import type { CommentFindManyArgs } from '@hbo-ict/lingo/types';
import { comment } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';
import { clauseHasProperty } from './utils';

export function useFindComment(args: CommentFindManyArgs) {
  const { data, isError, isLoading } = useQuery(
    ['comments', args],
    () => comment.findMany(args),
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
