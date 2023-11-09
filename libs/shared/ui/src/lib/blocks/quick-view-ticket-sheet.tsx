import { TicketDefaultReturn, TicketHistory } from '@hbo-ict/lingo/types';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '../components/sheet';
import {
  InfoCircledIcon,
  Cross2Icon,
  CopyIcon,
  Share1Icon,
  CalendarIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { formatDateWithRelativeTime, getInitials } from '../utils';
import { Avatar, AvatarFallback } from '../components/avatar';
import { ScrollArea } from '../components/scroll-area';
import { TimeLine } from './time-line';

export function QuikViewTicket(ticket: TicketDefaultReturn) {
  return (
    <Sheet>
      <SheetTrigger>
        <InfoCircledIcon className="hidden group-hover:block" />
      </SheetTrigger>
      <SheetContent className="p-0 md:max-w-lg sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="shadow-sm border-b py-2.5 px-2">
            <div className="flex flex-row justify-between items-center align-middle">
              <SheetClose asChild>
                <Button variant={'ghost'} size={'icon'}>
                  <Cross2Icon />
                </Button>
              </SheetClose>
              <div className="flex flex-row items-center gap-2">
                <Button variant="outline" asChild size={'sm'}>
                  <Link
                    href={`/workspace/tickets/${ticket.ticketNumber.number}`}
                  >
                    Open Record
                  </Link>
                </Button>
                <div>
                  <Button variant="ghost" size={'icon'}>
                    <CopyIcon />
                  </Button>
                  <Button variant="ghost" size={'icon'}>
                    <Share1Icon />
                  </Button>
                </div>
              </div>
            </div>
          </SheetTitle>
          {/* <Separator /> */}
          <SheetDescription>
            <div className="p-4">
              <span className="text-base font-semibold">{ticket.title}</span>
              <div className="flex flex-col gap-2 mt-4">
                <QuickViewTicketItem
                  label={'Assignee'}
                  value={
                    <Badge variant={'MEDIUM'}>{ticket.assignee?.name}</Badge>
                  }
                />
                <QuickViewTicketItem
                  label={'Opened'}
                  value={formatDateWithRelativeTime(
                    ticket.createdAt
                  ).formattedDateTime()}
                />
                <QuickViewTicketItem
                  label={'Severity'}
                  value={
                    <Badge variant={ticket.severity}>{ticket.severity}</Badge>
                  }
                />

                <QuickViewTicketItem
                  label={'Caller'}
                  value={<Badge variant={'MEDIUM'}>{ticket.caller.name}</Badge>}
                />
                <QuickViewTicketItem
                  label={'Group'}
                  value={ticket.team?.Department.name!}
                />

                <QuickViewTicketItem
                  label={'Status'}
                  value={<Badge variant={'MEDIUM'}>{ticket.status}</Badge>}
                />

                <QuickViewTicketItem
                  label={'Updated'}
                  value={formatDateWithRelativeTime(
                    ticket.updatedAt
                  ).relativeTime()}
                />
                <QuickViewTicketItem
                  label={'Description'}
                  value={<p className="text-ellipsis">{ticket.description}</p>}
                />
              </div>
            </div>
            <div className="mt-4 px-4">
              <span className="text-base text-primary ">Recent activity</span>
            </div>
            <div className="bg-gray-50 border-t mt-4 shadow-inner-top p-4 h-screen">
              <ScrollArea className="max-h-[70%] h-[70%]">
                <TimeLine />
              </ScrollArea>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
      <SheetOverlay />
    </Sheet>
  );
}

type QuikViewTicketItemProps = {
  label: string;
  value: string | React.ReactNode;
};

function QuickViewTicketItem({ label, value }: QuikViewTicketItemProps) {
  const childItem =
    typeof value === 'string' ? (
      <div className="text-left">{value}</div>
    ) : (
      value
    );

  return (
    <div className="grid grid-cols-[30%_50%] ">
      <div className="text-left">{label}</div>
      <div className="w-fit">{childItem}</div>
    </div>
  );
}

type CommentProps = {
  authorName: string;
  content: string;
  createdAt: Date;
};

function RecentComment({ authorName, content, createdAt }: CommentProps) {
  return (
    <div className="grid grid-rows-3 grid-flow-col">
      <div className="row-span-3 ">
        <Avatar>
          <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="col-span-10">
        <div className="flex flex-row gap-2 items-center">
          <span>{authorName}</span>
          <span className="text-xs">
            {formatDateWithRelativeTime(createdAt).relativeTime()}
          </span>
        </div>
      </div>
      <div className="row-span-2 col-span-2 ">
        <p>{content}</p>
      </div>
    </div>
  );
}
