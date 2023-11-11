import { TicketNumbeFindUniqueArgs } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';
import { clauseHasProperty } from './utils';

export function useCreateTicket({ enabled }: { enabled: boolean }) {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ['ticketNumber'],
    queryFn: Api.ticketNumber.create,
    enabled,
  });

  return {
    ticketNumber: data,
    isError,
    isSuccess,
  };
}

export function useWithTicketNumber({
  where,
  include,
}: TicketNumbeFindUniqueArgs) {
  const { data, isError } = useQuery(
    ['ticket-number', where],
    () => Api.ticketNumber.find({ where, include }),
    {
      enabled: clauseHasProperty<TicketNumbeFindUniqueArgs['where']>(where),
    },
  );

  return { ticketNumberData: data, isError };
}
