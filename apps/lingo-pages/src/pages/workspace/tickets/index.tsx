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
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TicketsRoot() {
  const router = useRouter();

  const { isError, isLoading, tickets } = useManyTickets({
    include: {
      team: true,
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
              <TableCell className="text-left">
                <Link
                  href={`/workspace/tickets/${ticket.ticketNumber.number}`}
                  className="hover:underline underline-offset-8
                  "
                >
                  <span>{ticket.ticketNumber.number}</span>
                </Link>
              </TableCell>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>
                <Link
                  href={`/workspace/tickets/?team=${ticket.team?.id}`}
                  className="hover:underline underline-offset-8
                  "
                >
                  <span>{ticket.team?.name}</span>
                </Link>
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
