import { TeamWithDepartment } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import {
  Button,
  ComponentsLayout,
  Separator,
  SummaryLink,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import { Component, Team } from '@prisma/client/lingo';
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
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    setBarData(
      data.map((item) => {
        return {
          ...item,
          total: Math.floor(Math.random() * 5000) + 1000,
          uv: Math.floor(Math.random() * 5000) + 1000,
          pv: Math.floor(Math.random() * 5000) + 1000,
        };
      })
    );
  }, [id]);

  const { data: component, isLoading } = useQuery<Component>(
    ['component', id],
    () => Api.component.getById(String(id)),
    {
      enabled: !!id,
    }
  );

  const teamId = component?.teamId;

  const { data: team } = useQuery<TeamWithDepartment>({
    queryKey: ['team', teamId],
    queryFn: () => Api.team.getById(String(teamId)),

    enabled: !!teamId,
  });

  console.log(team);

  if (!id) {
    return (
      <div className="col-span-4 bg-slate-50/50 flex flex-col items-center justify-center">
        <span className="text-slate-200">Select a component</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="col-span-4 bg-slate-50/50 flex flex-col items-center justify-center">
        <span className="text-slate-200">Loading...</span>
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
          {/* @ts-ignore */}
          <Link
            href={`/workspace/manage/departments/?department=${encodeURIComponent(
              team.Department?.name as string
            )}`}
          >
            {/* can be solved by setting the correct type  */}
            {/* @ts-ignore */}
            {team.Department.name}
          </Link>
        </Button>
        <Separator orientation="vertical" />
        <Button
          asChild
          variant={'link'}
          className="font-bold text-3xl text-slate-400"
        >
          <Link href={`/workspace/manage/teams/?team=${team.name}`}>
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
          href={`department=${encodeURIComponent(
            router.query.department as string
          )}&state=open`}
        />

        <SummaryLink
          max={100}
          min={10}
          icon={<LockClosedIcon />}
          label={'Total closed'}
          href={`department=${encodeURIComponent(
            router.query.department as string
          )}&state=closed`}
        />
        <SummaryLink
          max={100}
          min={10}
          icon={<Link1Icon />}
          label={'Total assigned'}
          href={`department=${encodeURIComponent(
            router.query.department as string
          )}&state=assigned`}
        />
        <SummaryLink
          max={100}
          min={10}
          icon={<LinkNone1Icon />}
          label={'Total unassigned'}
          href={`department=${encodeURIComponent(
            router.query.department as string
          )}&state=unassigned`}
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
