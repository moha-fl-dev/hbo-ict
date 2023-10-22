import { Api } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';

export function useCurrentUser() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: Api.auth.me,
    staleTime: 1000 * 60 * 60 * 24,
  });
  return {
    currentUser: data,
    isLoadingCurrentUser: isLoading,
    isErrorCurrentUser: isError,
  };
}
