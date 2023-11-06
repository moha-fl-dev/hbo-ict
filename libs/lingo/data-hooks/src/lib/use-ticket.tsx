import {
  Ticket,
  TicketFindManyArgs,
  TicketFindUniqueArgs,
} from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { clauseHasProperty } from './utils';
import { useWithTicketNumber } from './use-ticket-number';

export function useTicketByNumber(
  number: string,
  include?: TicketFindUniqueArgs['include']
) {
  const { isError, ticketNumberData } = useWithTicketNumber({
    where: { number },
  });

  const ticketNumberId = ticketNumberData?.id;

  return useTicketByArgs({
    where: { ticketNumberId: ticketNumberId },
    include,
  });
}

function useTicketByArgs({ where, include }: TicketFindUniqueArgs) {
  const {
    data,
    isError: ticketError,
    isLoading,
  } = useQuery(['ticket'], () => Api.ticket.find({ where, include }), {
    enabled: clauseHasProperty<TicketFindUniqueArgs['where']>(where),
  });

  return { ticket: data, ticketError, isLoading };
}

export function useManyTickets(payload: TicketFindManyArgs) {
  const { data, isError, isLoading } = useQuery(
    ['many-tickets', payload.where],
    () => Api.ticket.findMany(payload),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: clauseHasProperty<TicketFindManyArgs['where']>(payload.where),
    }
  );

  return { tickets: data, isError, isLoading };
}
