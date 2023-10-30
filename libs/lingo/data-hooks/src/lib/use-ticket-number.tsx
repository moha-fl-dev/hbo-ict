import { TicketNumbeFindUniqueArgs } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';
import { clauseHasProperty } from './utils';

export function useCreateTicket() {
  const { data, isError } = useQuery({
    queryKey: ['ticketNumber'],
    queryFn: Api.ticketNumber.create,
  });

  return {
    ticketNumber: data,
    isError,
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
    }
  );

  return { ticketNumberData: data, isError };
}
