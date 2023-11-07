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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@hbo-ict/ui';
import { TicketStatusEnum } from '@prisma/client/lingo';
import {
  DotsVerticalIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Sort = 'asc' | 'desc';

export default function TicketsRoot() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [position, setPosition] = useState<string>('');

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

    orderBy: {
      createdAt: router.query.sort_by_created_at as Sort,
      updatedAt: router.query.sort_by_updated_at as Sort,
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
            <TableHead>
              <span className="text-xs font-semibold">Number</span>
            </TableHead>
            <TableHead>
              <div className="flex flex-row gap-2 items-center">
                <span className="text-xs font-semibold">Opened</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DotsVerticalIcon
                      fontSize={'2rem'}
                      className="hover:cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={position}
                      onValueChange={(value) => {
                        setPosition(value);
                        queryClient.invalidateQueries(['many-tickets']);
                        router.push({
                          pathname: '/workspace/tickets',
                          query: { ...router.query, sort_by_created_at: value },
                        });
                      }}
                    >
                      <DropdownMenuRadioItem value="asc">
                        Asc
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="desc">
                        Desc
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
            <TableHead>
              <span className="text-xs font-semibold">Short description</span>
            </TableHead>
            <TableHead>
              <span className="text-xs font-semibold">Caller</span>
            </TableHead>
            <TableHead>
              <div className="flex flex-row gap-2 items-center">
                <span className="text-xs font-semibold">Severity</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DotsVerticalIcon
                      fontSize={'2rem'}
                      className="hover:cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={position}
                      onValueChange={setPosition}
                    >
                      <DropdownMenuRadioItem value="asc">
                        <span>Asc</span>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="desc">
                        <span>Desc</span>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
            <TableHead>
              <span className="text-xs font-semibold">Assignment Group</span>
            </TableHead>
            <TableHead>
              <span className="text-xs font-semibold">Component</span>
            </TableHead>
            <TableHead>
              <span className="text-xs font-semibold">Assigned To</span>
            </TableHead>
            <TableHead>
              <span className="text-xs font-semibold">Status</span>
            </TableHead>
            <TableHead>
              <div className="flex flex-row gap-2 items-center">
                <span className="text-xs font-semibold">Updated</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DotsVerticalIcon
                      fontSize={'2rem'}
                      className="hover:cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={position}
                      onValueChange={(value) => {
                        setPosition(value);
                        queryClient.invalidateQueries(['many-tickets']);
                        router.push({
                          pathname: '/workspace/tickets',
                          query: { ...router.query, sort_by_created_at: value },
                        });
                      }}
                    >
                      <DropdownMenuRadioItem value="asc">
                        Asc
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="desc">
                        Desc
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
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
              <TableCell className="hover:bg-muted transition-colors">
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
                <Badge
                  variant={ticket.severity}
                  className="w-full justify-center"
                >
                  {ticket.severity}
                </Badge>
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
