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
  formatDate,
} from '@hbo-ict/ui';
import { TicketStatusEnum } from '@prisma/client/lingo';
import { InfoCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
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
            <TableHead>
              <MagnifyingGlassIcon />
            </TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Opened</TableHead>
            <TableHead>Short description</TableHead>
            <TableHead>Caller</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Assignment Group</TableHead>
            <TableHead>Component</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets?.map((ticket, index) => (
            <TableRow key={index} className={` border-none h-14 group`}>
              <TableCell className="text-center ">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="mt-2 hover:text-workspace-primary transition-colors">
                      <InfoCircledIcon className="hidden group-hover:block" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Preview Ticket</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="hover:hover:bg-muted transition-colors">
                <Link href={`/workspace/tickets/${ticket.ticketNumber.number}`}>
                  <span className="text-workspace-primary hover:text-workspace-foreground transition-colors">
                    {ticket.ticketNumber.number}
                  </span>
                </Link>
              </TableCell>
              <TableCell className="hover:hover:bg-muted transition-colors">
                {formatDate(ticket.createdAt)}
              </TableCell>
              <TableCell className="hover:hover:bg-muted transition-colors">
                {ticket.title}
              </TableCell>
              <TableCell className="hover:hover:bg-muted transition-colors">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="hover:text-workspace-primary transition-colors">
                      <span className="text-workspace-primary ">
                        {ticket.caller.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Preview employee</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="hover:hover:bg-muted transition-colors">
                <Badge variant={ticket.severity}>{ticket.severity}</Badge>
              </TableCell>
              <TableCell className="hover:hover:bg-muted transition-colors">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href={`/workspace/tickets/?department=${ticket.team?.Department.id}`}
                        className=""
                      >
                        <span className="text-workspace-primary hover:text-workspace-foreground transition-colors">
                          {ticket.team?.Department.name}
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter by this department</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="hover:hover:bg-muted transition-colors">
                {ticket.component.name}
              </TableCell>
              <TableCell className="hover:hover:bg-muted transition-colors">
                {ticket.assignee?.name}
              </TableCell>

              <TableCell className="hover:hover:bg-muted transition-colors">
                {ticket.status}
              </TableCell>
              <TableCell className="hover:hover:bg-muted transition-colors">
                {formatDate(ticket.updatedAt)}
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
