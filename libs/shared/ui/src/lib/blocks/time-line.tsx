import type { TicketHistory } from '@hbo-ict/lingo/types';
import { formatDateWithRelativeTime } from '../utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Button } from '../components/button';

export function TimeLine() {
  const timeline: TicketHistory = {
    actionType: 'ASSIGNMENT_CHANGE',
    createdAt: new Date(),
    employeeId: '',
    newValue: 'John Doe',
    oldValue: 'Jane Doe',
    ticketId: '1',
    id: '1',
  };

  return (
    <div>
      <TimeLineItem {...timeline} />
      <TimeLineItem {...timeline} />
      <TimeLineItem {...timeline} />
      <TimeLineItem {...timeline} />
      <TimeLineItem {...timeline} />
      <TimeLineItem {...timeline} />
      <TimeLineItem {...timeline} />
      <TimeLineItem {...timeline} />
      <TimeLineItem {...timeline} />
      <TimeLineItem {...timeline} />
      <TimeLineItem {...timeline} />
    </div>
  );
}

function TimeLineItem({
  actionType,
  createdAt,
  oldValue,
  newValue,
}: TicketHistory) {
  const date = formatDateWithRelativeTime(
    '2023-11-06 12:40:51.917',
  ).relativeTime();

  return (
    <div className="flex gap-x-3">
      <div className="w-16 text-end mt-1">
        <span className="text-xs text-gray-500 ">{date}</span>
      </div>

      <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
        <div className="relative z-10 w-7 h-7 flex justify-center items-center">
          <CalendarIcon />
        </div>
      </div>

      <div className="grow pt-0.5 pb-8">
        <h3 className="flex gap-x-1.5 font-semibold text-gray-800 ">
          Marked "Install Charts" completed
        </h3>
        <Button variant={'ghost'} asChild className="mt-1 text-xs" size={'sm'}>
          <Link href={'/workspace/tickets/1'}>John Doe</Link>
        </Button>
      </div>
    </div>
  );
}
