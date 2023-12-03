import { auth } from '@hbo-ict/query-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePerformSignOut() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: auth.signOut,

    onSettled: () => {
      queryClient.clear();
      window.location.href = '/sign-in'; // hard realod to prevent stale data
    },
  });

  return {
    signOut: mutate,
  };
}
