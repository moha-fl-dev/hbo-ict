import { useComponent, useTeam } from '@hbo-ict/hooks';
import {
  Badge,
  Button,
  ComponentsLayout,
  SummaryLink,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import { TicketStatusEnum } from '@prisma/client/lingo';
import {
  ChevronRightIcon,
  Link1Icon,
  LinkNone1Icon,
  LockClosedIcon,
  LockOpen1Icon,
} from '@radix-ui/react-icons';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ManageComponents() {
  const router = useRouter();

  const componentId = router.query.component as string;

  const { component } = useComponent(componentId);

  const teamId = component?.teamId as string;

  const { team } = useTeam(teamId);

  if (!componentId) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-slate-300">Select a component</span>
      </div>
    );
  }

  if (!component || !team) {
    return (
      <div className="bg-slate-50/50 flex flex-col items-center justify-center h-full">
        <span className="text-slate-200">Component not found</span>
      </div>
    );
  }

  return (
    <div className="h-[80vh]">
      <div className="border-b">
        <div className="flex flex-row justify-between items-center p-2">
          <div className="flex flex-row items-center p-2">
            <Button variant={'ghost'} asChild>
              <Link
                href={`/workspace/manage/departments?department=${team.Department.id}`}
                className="flex flex-row items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span>{team.Department.name}</span>
                <ChevronRightIcon />
              </Link>
            </Button>
            <Button variant={'ghost'} asChild>
              <Link
                href={`/workspace/manage/teams?team=${team.id}`}
                className="flex flex-row gap-1 items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span>{team.name}</span>
                <ChevronRightIcon />
              </Link>
            </Button>
            <Button variant={'ghost'}>{component.name}</Button>
          </div>
          <div className="px-2">
            <Badge>Operational</Badge>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="grid grid-cols-2 gap-2">
          <SummaryLink
            max={100}
            min={10}
            icon={<LockOpen1Icon />}
            label={'Total open'}
            href={`/workspace/tickets?component=${encodeURIComponent(
              component.id,
            )}&ticket_status=${
              TicketStatusEnum.OPEN
            }&department=${encodeURIComponent(
              team.Department.id,
            )}&team=${encodeURIComponent(team.id)}`}
          />

          <SummaryLink
            max={100}
            min={10}
            icon={<LockClosedIcon />}
            label={'Total closed'}
            href={`/workspace/tickets?component=${encodeURIComponent(
              component.id,
            )}&ticket_status=${
              TicketStatusEnum.CLOSED
            }&department=${encodeURIComponent(
              team.Department.id,
            )}&team=${encodeURIComponent(team.id)}`}
          />
          <SummaryLink
            max={100}
            min={10}
            icon={<Link1Icon />}
            label={'Total assigned'}
            href={`/workspace/tickets?component=${encodeURIComponent(
              component.id,
            )}&ticket_status=${
              TicketStatusEnum.ACTIVE
            }&department=${encodeURIComponent(
              team.Department.id,
            )}&team=${encodeURIComponent(team.id)}`}
          />
          <SummaryLink
            max={100}
            min={10}
            icon={<LinkNone1Icon />}
            label={'Total unassigned'}
            href={`/workspace/tickets?component=${encodeURIComponent(
              component.id,
            )}&ticket_status=${
              TicketStatusEnum.HOLD
            }&department=${encodeURIComponent(
              team.Department.id,
            )}&team=${encodeURIComponent(team.id)}`}
          />
        </div>
      </div>
    </div>
  );
}

ManageComponents.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <Head>
        <title>Manage components</title>
      </Head>
      <ComponentsLayout>{page}</ComponentsLayout>
    </WorkspaceRootLayout>
  );
};
