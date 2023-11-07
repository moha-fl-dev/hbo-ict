import { useManyTickets } from '@hbo-ict/hooks';
import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TicketsLayout,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import { TicketStatusEnum } from '@prisma/client/lingo';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TicketsRoot() {
  const router = useRouter();

  const { isError, isLoading, tickets } = useManyTickets({
    include: {
      team: {
        include: {
          Department: true,
        },
      },
      assignee: true,
      component: true,
      ticketNumber: true,
      caller: true,
    },
    where: {
      team: {
        id: {
          equals: router.query.team as string,
        },
        Department: {
          id: {
            equals: router.query.department as string,
          },
        },
      },
      status: {
        equals: router.query.ticket_status as TicketStatusEnum,
      },
      component: {
        id: {
          equals: router.query.component as string,
        },
      },
    },
  });

  return (
    <div>
      <Table>
        <TableCaption>End of Tickets</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Component</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Caller</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Severity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets?.map((ticket, index) => (
            <TableRow key={index}>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href={`/workspace/tickets/${ticket.ticketNumber.number}`}
                      >
                        <span>{ticket.ticketNumber.number}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View ticket details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href={`/workspace/tickets/?department=${ticket.team?.Department.id}`}
                        className=""
                      >
                        <span>{ticket.team?.Department.name}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter by this department</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href={`/workspace/tickets/?team=${ticket.team?.id}`}
                      >
                        <span>{ticket.team?.name}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter by this Team</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>{ticket.component.name}</TableCell>
              <TableCell>{ticket.assignee?.name}</TableCell>
              <TableCell>{ticket.caller.name}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>
                <Badge variant={ticket.severity}>{ticket.severity}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

TicketsRoot.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <TicketsLayout key={'many-tickets'}>{page}</TicketsLayout>
    </WorkspaceRootLayout>
  );
};
