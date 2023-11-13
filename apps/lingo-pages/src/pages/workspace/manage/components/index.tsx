import { useComponent, useTeam } from '@hbo-ict/hooks';
import {
  Button,
  ComponentsLayout,
  ScrollArea,
  Separator,
  SummaryLink,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import { TicketStatusEnum } from '@prisma/client/lingo';
import {
  Link1Icon,
  LinkNone1Icon,
  LockClosedIcon,
  LockOpen1Icon,
} from '@radix-ui/react-icons';
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
      <div className="col-span-4 bg-slate-50/50 flex flex-col items-center justify-center">
        <span className="text-slate-200">Select a component</span>
      </div>
    );
  }

  if (!component || !team) {
    return (
      <div className="col-span-4 bg-slate-50/50 flex flex-col items-center justify-center">
        <span className="text-slate-200">Component not found</span>
      </div>
    );
  }

  return (
    <div className="col-span-4 bg-slate-50/50 flex flex-col justify-around items-center gap-2 p-4">
      <div className="flex flex-col items-center">
        <Button
          asChild
          variant={'link'}
          className="font-bold text-3xl text-slate-400"
        >
          <Link
            href={`/workspace/manage/departments/?department=${encodeURIComponent(
              team.Department.id as string,
            )}`}
          >
            {team.Department.name}
          </Link>
        </Button>
        <Separator orientation="vertical" />
        <Button
          asChild
          variant={'link'}
          className="font-bold text-3xl text-slate-400"
        >
          <Link href={`/workspace/manage/teams/?team=${team.id}`}>
            {team.name}
          </Link>
        </Button>
        <Separator orientation="vertical" />

        <h1 className="font-bold text-3xl text-slate-400">{component.name}</h1>
        <Separator orientation="vertical" />
      </div>
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
  );
}

ManageComponents.getLayout = function getLayout(_page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <ScrollArea className="max-h-[90vh] h-[90vh] min-h[90vh]">
        <ComponentsLayout />
      </ScrollArea>
    </WorkspaceRootLayout>
  );
};
