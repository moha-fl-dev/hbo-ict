import { TicketStatusEnum } from '@hbo-ict/lingo/types';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './pop-over';

type QuickLinksPopoverProps = {
  name: string;
  id: string;
  baseHref: string;
};

function createTicketStatusDesc() {
  return {
    [TicketStatusEnum.OPEN]: 'Open tickets',
    [TicketStatusEnum.ACTIVE]: 'Active tickets',
    [TicketStatusEnum.HOLD]: 'Tickets on hold',
    [TicketStatusEnum.CLOSED]: 'Closed tickets',
  };
}

export function QuickLinksPopover<T extends QuickLinksPopoverProps>({
  feature,
}: {
  feature: T;
}) {
  const ticketStates = Object.values(TicketStatusEnum);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <InfoCircledIcon className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="triangle-top">
        <div className="flex flex-col gap-1">
          <span className="text-lg">{feature.name}</span>
          <span className="text-xs text-muted-foreground">Quick links</span>
        </div>
        <div className="grid gap-2 mt-2">
          {ticketStates.map((state, i) => (
            <Button variant={'outline'} asChild size={'sm'} key={i}>
              <Link
                href={`${feature.baseHref}=${encodeURIComponent(
                  feature.id,
                )}&ticket_status=${state}`}
              >
                {createTicketStatusDesc()[state]}
              </Link>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
