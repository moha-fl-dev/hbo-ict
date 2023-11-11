import {
  Ticket,
  TicketFindManyArgs,
  TicketFindUniqueArgs,
} from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { QueryKey, useQuery, useQueryClient } from '@tanstack/react-query';
import { clauseHasProperty } from './utils';
import { useWithTicketNumber } from './use-ticket-number';

export function useTicketByNumber(
  number: string,
  include?: TicketFindUniqueArgs['include'],
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
  // constryct enabled to run when where, skip or take is defined
  const enabled = Boolean(
    clauseHasProperty<TicketFindManyArgs['where']>(payload.where) ||
      (payload.skip !== undefined && payload.take !== undefined) ||
      clauseHasProperty<TicketFindManyArgs['orderBy']>(payload.orderBy),
  );

  // construct query key based on payload
  // this resolves the dependency issue with react-query
  let queryKey: QueryKey = ['many-tickets'];
  if (payload.where) queryKey = [...queryKey, 'where', payload.where];
  if (payload.skip !== undefined)
    queryKey = [...queryKey, 'skip', payload.skip];
  if (payload.take !== undefined)
    queryKey = [...queryKey, 'take', payload.take];
  if (payload.orderBy) queryKey = [...queryKey, 'orderBy', payload.orderBy];

  const { data, isError, isLoading } = useQuery(
    queryKey,
    () => Api.ticket.findMany(payload),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled,
    },
  );

  return { tickets: data, isError, isLoading };
}
