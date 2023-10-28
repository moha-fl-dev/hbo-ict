import { Api } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';

export function useTicketNumber() {
  const { data, isError } = useQuery({
    queryKey: ['ticketNumber'],
    queryFn: Api.ticketNumber.create,
  });

  return {
    ticketNumber: data,
    isError,
  };
}
