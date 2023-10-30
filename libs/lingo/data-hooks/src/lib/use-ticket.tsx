import { Ticket, TicketFindUniqueArgs } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';
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
