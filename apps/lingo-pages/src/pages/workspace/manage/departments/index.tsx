import {
  DepartmentsLayout,
  ScrollArea,
  SummaryLink,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import {
  Link1Icon,
  LinkNone1Icon,
  LockClosedIcon,
  LockOpen1Icon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  useDepartment,
  useTeams,
  useTeamsWithDepartment,
} from '@hbo-ict/hooks';
import { TicketStatusEnum } from '@hbo-ict/lingo/types';

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
];

export default function ManageDepartments() {
  const [barData, setBarData] = React.useState(data);
  const router = useRouter();

  const departmentId = router.query.department as string;

  const { department } = useDepartment(departmentId);

  const { teams } = useTeamsWithDepartment(departmentId);

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
  }, [departmentId]);

  if (!departmentId) {
    return (
      <div className="col-span-4 bg-slate-50/50 flex flex-col items-center justify-center">
        <span className="text-slate-200">Select a department</span>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="col-span-4 bg-slate-50/50 flex flex-col items-center justify-center">
        <span className="text-slate-200">Department not found</span>
      </div>
    );
  }

  return (
    <div className="col-span-4 h-full">
      <div className="grid grid-flow-col gap-4  grid-cols-3">
        <div className="bg-slate-50 col-span-1">
          <ScrollArea className="max-h-[80vh] h-[80vh] min-h[80vh]">
            <Table>
              <TableCaption>End of teams list</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">
                    <span>Teams</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams?.map((team, i) => (
                  <TableRow key={i} className="">
                    <TableCell key={i}>
                      <Link
                        href={`/workspace/manage/teams/?team=${encodeURIComponent(
                          team.id,
                        )}`}
                        className="w-full block"
                      >
                        <span>{team.name}</span>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col justify-between items-center h-full">
            <h1 className="font-bold text-3xl text-slate-400">
              {department.name}
            </h1>
            <div className="grid grid-cols-2 gap-2">
              <SummaryLink
                max={100}
                min={10}
                icon={<LockOpen1Icon />}
                label={'Total open'}
                href={`/workspace/tickets?department=${encodeURIComponent(
                  department.id,
                )}&ticket_status=${TicketStatusEnum.OPEN}`}
              />

              <SummaryLink
                max={100}
                min={10}
                icon={<LockClosedIcon />}
                label={'Total closed'}
                href={`/workspace/tickets?department=${encodeURIComponent(
                  department.id,
                )}&ticket_status=${TicketStatusEnum.CLOSED}`}
              />
              <SummaryLink
                max={100}
                min={10}
                icon={<Link1Icon />}
                label={'Total assigned'}
                href={`/workspace/tickets?department=${encodeURIComponent(
                  department.id,
                )}&ticket_status=${TicketStatusEnum.ACTIVE}`}
              />
              <SummaryLink
                max={100}
                min={10}
                icon={<LinkNone1Icon />}
                label={'Total unassigned'}
                href={`/workspace/tickets?department=${encodeURIComponent(
                  department.id,
                )}&ticket_status=${TicketStatusEnum.HOLD}`}
              />
            </div>
            <ResponsiveContainer height={350} width={'100%'}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

ManageDepartments.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <DepartmentsLayout>{page}</DepartmentsLayout>
    </WorkspaceRootLayout>
  );
};
