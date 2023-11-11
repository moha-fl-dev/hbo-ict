import { useComponent, useTeam } from '@hbo-ict/hooks';
import { StrictTeamWithDepartment } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import {
  Button,
  ComponentsLayout,
  Separator,
  SummaryLink,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import { Component, Team, TicketStatusEnum } from '@prisma/client/lingo';
import {
  LockOpen1Icon,
  LockClosedIcon,
  Link1Icon,
  LinkNone1Icon,
} from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
];

export default function ManageComponents() {
  const [barData, setBarData] = useState(data);

  const router = useRouter();

  const componentId = router.query.component as string;

  useEffect(() => {
    setBarData(
      data.map((item) => {
        return {
          ...item,
          total: Math.floor(Math.random() * 5000) + 1000,
          uv: Math.floor(Math.random() * 5000) + 1000,
          pv: Math.floor(Math.random() * 5000) + 1000,
        };
      }),
    );
  }, [componentId]);

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
      {router.query.department && (
        <ResponsiveContainer
          height={350}
          width={'100%'}
          className="lg:block hidden"
        >
          <LineChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

ManageComponents.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <ComponentsLayout>{page}</ComponentsLayout>
    </WorkspaceRootLayout>
  );
};
