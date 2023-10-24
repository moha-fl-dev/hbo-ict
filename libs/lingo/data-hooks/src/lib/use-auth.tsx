import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '@hbo-ict/query-fns';

export function usePerformSignOut() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: Api.auth.signOut,

    onSettled: () => {
      queryClient.clear();
      window.location.href = '/sign-in'; // hard realod to prevent stale data
    },
  });

  return {
    signOut: mutate,
  };
}
